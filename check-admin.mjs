import { drizzle } from 'drizzle-orm/mysql2';
import { adminUsers } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);
const admins = await db.select().from(adminUsers);
console.log('Admins no banco:', JSON.stringify(admins, null, 2));
process.exit(0);
