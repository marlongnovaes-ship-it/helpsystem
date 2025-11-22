import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = sqliteTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").primaryKey({ autoIncrement: true }),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: int("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: int("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: int("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Support requests table
 */
export const supportRequests = sqliteTable("supportRequests", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  serviceType: text("serviceType", { 
    enum: ["formatacao", "limpeza", "atualizacao", "suporte_remoto"] 
  }).notNull(),
  description: text("description"),
  status: text("status", { 
    enum: ["pendente", "em_andamento", "concluido"] 
  }).default("pendente").notNull(),
  createdAt: int("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: int("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type SupportRequest = typeof supportRequests.$inferSelect;
export type InsertSupportRequest = typeof supportRequests.$inferInsert;

/**
 * Site content table - stores editable content for the website
 */
export const siteContent = sqliteTable("siteContent", {
  id: int("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  section: text("section").notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

/**
 * Admin users table for panel access
 */
export const adminUsers = sqliteTable("adminUsers", {
  id: int("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: int("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
