import { drizzle } from 'drizzle-orm/mysql2';
import { adminUsers } from './drizzle/schema.ts';
import { createAdminUser } from './server/db.ts';

const db = drizzle(process.env.DATABASE_URL);

// Limpar tabela
await db.delete(adminUsers);
console.log('✓ Tabela de admins limpa');

// Recriar admin
await createAdminUser('admin', 'HelpSystem2025!');
console.log('✓ Usuário admin recriado com novo hash');

process.exit(0);
