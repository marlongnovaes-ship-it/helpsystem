import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, supportRequests, InsertSupportRequest, siteContent, InsertSiteContent, adminUsers, InsertAdminUser } from "../drizzle/schema";
import { ENV } from './_core/env';
import crypto from 'crypto';

// Função para hash de senha usando crypto nativo
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Função para verificar senha
function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createSupportRequest(request: InsertSupportRequest) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(supportRequests).values(request);
  return result;
}

export async function getAllSupportRequests() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(supportRequests).orderBy(desc(supportRequests.createdAt));
}

export async function updateSupportRequestStatus(id: number, status: "pendente" | "em_andamento" | "concluido") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(supportRequests).set({ status }).where(eq(supportRequests.id, id));
}

// Site Content functions
export async function getAllSiteContent() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(siteContent);
}

export async function getSiteContentByKey(key: string) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertSiteContent(content: InsertSiteContent) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(siteContent).values(content).onDuplicateKeyUpdate({
    set: { value: content.value, updatedAt: new Date() },
  });
}

// Admin functions
export async function createAdminUser(username: string, password: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const passwordHash = hashPassword(password);
  await db.insert(adminUsers).values({ username, passwordHash });
}

export async function verifyAdminCredentials(username: string, password: string) {
  const db = await getDb();
  if (!db) {
    return false;
  }

  const result = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  if (result.length === 0) {
    return false;
  }

  return verifyPassword(password, result[0].passwordHash);
}
