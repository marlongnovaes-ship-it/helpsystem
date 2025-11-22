import { createAdminUser } from './server/db.ts';

// Criar usuário admin padrão
const username = 'admin';
const password = 'HelpSystem2025!';

try {
  await createAdminUser(username, password);
  console.log('✓ Usuário admin criado com sucesso!');
  console.log(`  Usuário: ${username}`);
  console.log(`  Senha: ${password}`);
} catch (error) {
  if (error.message?.includes('Duplicate')) {
    console.log('✓ Usuário admin já existe');
  } else {
    console.error('Erro ao criar admin:', error);
  }
}

process.exit(0);
