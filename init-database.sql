-- Script de inicialização do banco de dados MySQL para HelpSystem
-- Execute este script após criar o banco de dados

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  createdAt DATETIME NOT NULL,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar tabela de solicitações de suporte
CREATE TABLE IF NOT EXISTS supportRequests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  serviceType ENUM('formatacao', 'limpeza', 'atualizacao', 'suporte_remoto') NOT NULL,
  description TEXT,
  status ENUM('pendente', 'em_andamento', 'concluido') NOT NULL DEFAULT 'pendente',
  createdAt DATETIME NOT NULL,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar tabela de conteúdo do site
CREATE TABLE IF NOT EXISTS siteContent (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  label VARCHAR(255) NOT NULL,
  section VARCHAR(100) NOT NULL,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar tabela de administradores
CREATE TABLE IF NOT EXISTS adminUsers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  passwordHash VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário administrador padrão
-- Usuário: admin
-- Senha: R+slp2OkGEQGnQ3OoWnv3w==
INSERT INTO adminUsers (username, passwordHash) VALUES 
('admin', '73da2232c4bc2db439e42cc8bcf0d796:ee37ad4fdcc26e42e37e5d50fbf288d4ccafd9d67deb47243d91b2ba638f0a954eb08a77e8503ba86f8f13c9c803eb59364c7cc6fcd8dd9f8a5bba9b053e2ae4')
ON DUPLICATE KEY UPDATE username=username;

-- Inserir conteúdo padrão do site
INSERT INTO siteContent (`key`, value, label, section) VALUES
('hero_title', 'Suporte Técnico em Informática', 'Título Principal', 'hero'),
('hero_subtitle', 'Soluções completas para seu computador com atendimento 24/7', 'Subtítulo Principal', 'hero'),
('hero_cta_primary', 'Solicitar Suporte', 'Botão Principal', 'hero'),
('hero_cta_secondary', 'Nossos Serviços', 'Botão Secundário', 'hero'),

('services_title', 'Nossos Serviços', 'Título da Seção', 'services'),
('service_1_title', 'Formatação de Computadores', 'Serviço 1 - Título', 'services'),
('service_1_description', 'Reinstalação completa do sistema operacional com backup de dados e otimização', 'Serviço 1 - Descrição', 'services'),
('service_2_title', 'Limpeza Física', 'Serviço 2 - Título', 'services'),
('service_2_description', 'Limpeza profunda de hardware, remoção de poeira e manutenção preventiva', 'Serviço 2 - Descrição', 'services'),
('service_3_title', 'Atualização de Sistema', 'Serviço 3 - Título', 'services'),
('service_3_description', 'Atualização de drivers, sistema operacional e softwares essenciais', 'Serviço 3 - Descrição', 'services'),
('service_4_title', 'Suporte Remoto 24/7', 'Serviço 4 - Título', 'services'),
('service_4_description', 'Atendimento remoto disponível a qualquer hora para resolver seus problemas', 'Serviço 4 - Descrição', 'services'),

('attendance_title', 'Atendimento', 'Título da Seção', 'attendance'),
('attendance_remote_title', 'Suporte Remoto', 'Atendimento Remoto - Título', 'attendance'),
('attendance_remote_description', 'Disponível 24 horas por dia, 7 dias por semana', 'Atendimento Remoto - Descrição', 'attendance'),
('attendance_local_title', 'Atendimento Presencial', 'Atendimento Presencial - Título', 'attendance'),
('attendance_local_description', 'Agendamento disponível de segunda a sábado', 'Atendimento Presencial - Descrição', 'attendance'),

('contact_title', 'Solicite um Orçamento', 'Título da Seção', 'contact'),
('contact_subtitle', 'Preencha o formulário abaixo e entraremos em contato', 'Subtítulo da Seção', 'contact'),

('footer_description', 'Suporte técnico especializado em informática com anos de experiência no mercado', 'Descrição do Rodapé', 'footer'),
('footer_phone', '(11) 99999-9999', 'Telefone', 'footer'),
('footer_email', 'contato@helpsystem.com.br', 'Email', 'footer'),
('footer_address', 'São Paulo, SP - Brasil', 'Endereço', 'footer')
ON DUPLICATE KEY UPDATE value=VALUES(value);
