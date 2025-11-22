const crypto = require('crypto');

// Função para hash de senha
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Gerar senha forte
const strongPassword = crypto.randomBytes(16).toString('base64');
const hashedPassword = hashPassword(strongPassword);

console.log('='.repeat(60));
console.log('CREDENCIAIS DO ADMINISTRADOR');
console.log('='.repeat(60));
console.log('Usuário: admin');
console.log('Senha: ' + strongPassword);
console.log('='.repeat(60));
console.log('IMPORTANTE: Salve estas credenciais em local seguro!');
console.log('='.repeat(60));
console.log('');
console.log('Hash da senha (para inserir no banco):');
console.log(hashedPassword);
