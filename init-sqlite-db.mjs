import Database from 'better-sqlite3';
import crypto from 'crypto';


// Função para hash de senha
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Gerar senha aleatória forte
function generateStrongPassword() {
  return crypto.randomBytes(16).toString('base64');
}

const dbPath = './data/helpsystem.db';
const sqlite = new Database(dbPath);

console.log('🗄️  Criando banco de dados SQLite...');

// Criar tabelas
sqlite.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  openId TEXT NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  loginMethod TEXT,
  role TEXT DEFAULT 'user' NOT NULL CHECK(role IN ('user', 'admin')),
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  lastSignedIn INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS supportRequests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  serviceType TEXT NOT NULL CHECK(serviceType IN ('formatacao', 'limpeza', 'atualizacao', 'suporte_remoto')),
  description TEXT,
  status TEXT DEFAULT 'pendente' NOT NULL CHECK(status IN ('pendente', 'em_andamento', 'concluido')),
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS siteContent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  section TEXT NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS adminUsers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  createdAt INTEGER NOT NULL
);
`);

console.log('✅ Tabelas criadas!');

// Gerar senha de admin
const adminPassword = generateStrongPassword();
const passwordHash = hashPassword(adminPassword);

// Inserir admin
const insertAdmin = sqlite.prepare(`
  INSERT OR REPLACE INTO adminUsers (username, passwordHash, createdAt)
  VALUES (?, ?, ?)
`);

insertAdmin.run('admin', passwordHash, Date.now());

console.log('✅ Usuário admin criado!');
console.log('');
console.log('═══════════════════════════════════════════════════');
console.log('🔐 CREDENCIAIS DE ACESSO AO PAINEL ADMINISTRATIVO');
console.log('═══════════════════════════════════════════════════');
console.log('');
console.log('  URL: https://helpsystem-silk.vercel.app/admin');
console.log('  Usuário: admin');
console.log(`  Senha: ${adminPassword}`);
console.log('');
console.log('═══════════════════════════════════════════════════');
console.log('⚠️  GUARDE ESTAS CREDENCIAIS EM LOCAL SEGURO!');
console.log('═══════════════════════════════════════════════════');

// Inserir conteúdo inicial do site
const siteContentData = [
  // Hero Section
  { key: 'hero_title', value: 'Suporte Técnico em Informática', label: 'Título Principal', section: 'hero' },
  { key: 'hero_subtitle', value: 'Soluções rápidas e eficientes para todos os seus problemas de TI', label: 'Subtítulo', section: 'hero' },
  { key: 'hero_cta_primary', value: 'Solicitar Suporte', label: 'Botão Principal', section: 'hero' },
  { key: 'hero_cta_secondary', value: 'Saiba Mais', label: 'Botão Secundário', section: 'hero' },
  
  // Services Section
  { key: 'service_formatacao_title', value: 'Formatação e Reinstalação', label: 'Serviço 1 - Título', section: 'services' },
  { key: 'service_formatacao_desc', value: 'Formatação completa do sistema operacional com instalação de drivers e programas essenciais.', label: 'Serviço 1 - Descrição', section: 'services' },
  
  { key: 'service_limpeza_title', value: 'Limpeza e Manutenção', label: 'Serviço 2 - Título', section: 'services' },
  { key: 'service_limpeza_desc', value: 'Limpeza física e digital do computador, remoção de vírus e otimização de desempenho.', label: 'Serviço 2 - Descrição', section: 'services' },
  
  { key: 'service_atualizacao_title', value: 'Atualização de Hardware', label: 'Serviço 3 - Título', section: 'services' },
  { key: 'service_atualizacao_desc', value: 'Upgrade de componentes como memória RAM, SSD, placa de vídeo e processador.', label: 'Serviço 3 - Descrição', section: 'services' },
  
  { key: 'service_suporte_title', value: 'Suporte Remoto', label: 'Serviço 4 - Título', section: 'services' },
  { key: 'service_suporte_desc', value: 'Atendimento remoto para resolver problemas de software, configurações e dúvidas técnicas.', label: 'Serviço 4 - Descrição', section: 'services' },
  
  // Attendance Section
  { key: 'attendance_title', value: 'Atendimento Personalizado', label: 'Título da Seção', section: 'attendance' },
  { key: 'attendance_desc', value: 'Oferecemos atendimento 24/7 com profissionais qualificados para resolver seus problemas de TI.', label: 'Descrição', section: 'attendance' },
  
  // Contact Section
  { key: 'contact_title', value: 'Entre em Contato', label: 'Título da Seção', section: 'contact' },
  { key: 'contact_subtitle', value: 'Preencha o formulário e entraremos em contato o mais breve possível.', label: 'Subtítulo', section: 'contact' },
  
  // Footer
  { key: 'footer_company_name', value: 'HelpSystem', label: 'Nome da Empresa', section: 'footer' },
  { key: 'footer_description', value: 'Suporte técnico profissional em informática.', label: 'Descrição', section: 'footer' },
  { key: 'footer_email', value: 'contato@helpsystem.com.br', label: 'Email', section: 'footer' },
  { key: 'footer_phone', value: '(11) 99999-9999', label: 'Telefone', section: 'footer' },
];

const insertContent = sqlite.prepare(`
  INSERT OR REPLACE INTO siteContent (key, value, label, section, updatedAt)
  VALUES (?, ?, ?, ?, ?)
`);

for (const content of siteContentData) {
  insertContent.run(content.key, content.value, content.label, content.section, Date.now());
}

console.log('✅ Conteúdo inicial do site inserido!');
console.log('');
console.log('🎉 Banco de dados inicializado com sucesso!');

// Salvar credenciais em arquivo
import { writeFileSync } from 'fs';
writeFileSync('./admin-credentials-sqlite.txt', `
═══════════════════════════════════════════════════
🔐 CREDENCIAIS DE ACESSO AO PAINEL ADMINISTRATIVO
═══════════════════════════════════════════════════

URL: https://helpsystem-silk.vercel.app/admin
Usuário: admin
Senha: ${adminPassword}

═══════════════════════════════════════════════════
⚠️  GUARDE ESTAS CREDENCIAIS EM LOCAL SEGURO!
═══════════════════════════════════════════════════
`);

console.log('💾 Credenciais salvas em: admin-credentials-sqlite.txt');

sqlite.close();
