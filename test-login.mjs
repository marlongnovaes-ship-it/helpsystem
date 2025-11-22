import { verifyAdminCredentials } from './server/db.ts';

const username = 'admin';
const password = 'HelpSystem2025!';

console.log('Testando login...');
try {
  const isValid = await verifyAdminCredentials(username, password);
  console.log('Resultado:', isValid);
} catch (error) {
  console.error('Erro:', error.message);
  console.error('Stack:', error.stack);
}

process.exit(0);
