# HelpSystem - Suporte Técnico em Informática

Site profissional para serviços de suporte técnico em informática, incluindo formatação, limpeza física, atualização de sistemas e suporte remoto.

## 🚀 Funcionalidades

- **Formulário de Solicitação de Suporte** - Clientes podem solicitar serviços diretamente pelo site
- **Painel Administrativo** - Gerenciamento de solicitações com autenticação
- **Design Responsivo** - Otimizado para desktop e mobile
- **Animações Modernas** - Interface profissional com tema tecnológico
- **Sistema de Notificações** - Alertas automáticos para novas solicitações

## 🛠️ Tecnologias

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend:** Node.js, Express, tRPC 11
- **Banco de Dados:** PostgreSQL com Drizzle ORM
- **Build:** Vite 7, esbuild

## 📋 Pré-requisitos

- Node.js 22.x ou superior
- PostgreSQL 14 ou superior
- pnpm (gerenciador de pacotes)

## 🔧 Instalação Local

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd helpsystem
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
- `DATABASE_URL`: URL de conexão do PostgreSQL
- `SESSION_SECRET`: Chave secreta para sessões

4. Execute as migrações do banco de dados:
```bash
pnpm db:push
```

5. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 🚀 Deploy no Render

### 1. Criar Banco de Dados PostgreSQL

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "PostgreSQL"
3. Configure:
   - **Name:** helpsystem-db
   - **Database:** helpsystem
   - **User:** helpsystem
   - **Region:** Escolha a mais próxima
   - **Plan:** Free
4. Clique em "Create Database"
5. Copie a **Internal Database URL** (formato: `postgresql://...`)

### 2. Criar Web Service

1. No Render Dashboard, clique em "New +" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - **Name:** helpsystem
   - **Region:** Mesma do banco de dados
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `pnpm install && pnpm build && pnpm db:push`
   - **Start Command:** `pnpm start`
   - **Plan:** Free

### 3. Configurar Variáveis de Ambiente

Na seção "Environment Variables", adicione:

- `DATABASE_URL`: Cole a Internal Database URL do passo 1
- `NODE_ENV`: `production`
- `SESSION_SECRET`: Gere uma chave aleatória (ex: use `openssl rand -base64 32`)

### 4. Deploy

1. Clique em "Create Web Service"
2. Aguarde o build e deploy (pode levar 5-10 minutos)
3. Seu site estará disponível em `https://helpsystem.onrender.com`

## 📊 Gerenciamento de Solicitações

As solicitações de suporte são armazenadas na tabela `supportRequests` do banco de dados.

### Campos da Solicitação:
- `id`: Identificador único
- `name`: Nome do cliente
- `email`: Email do cliente
- `serviceType`: Tipo de serviço (formatacao, limpeza, atualizacao, suporte_remoto)
- `description`: Descrição do problema (opcional)
- `status`: Status (pendente, em_andamento, concluido)
- `createdAt`: Data de criação
- `updatedAt`: Última atualização

### Acessar Painel Admin:

1. Acesse `https://seu-site.onrender.com/admin`
2. Use as credenciais configuradas durante a inicialização

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Sessões protegidas com JWT
- Validação de dados no frontend e backend
- Proteção contra SQL injection via Drizzle ORM

## 📱 Serviços Oferecidos

1. **Formatação de Computadores** - Reinstalação completa do sistema operacional
2. **Limpeza Física** - Limpeza profunda de hardware e manutenção preventiva
3. **Atualização de Sistema** - Upgrade de sistemas operacionais e drivers
4. **Suporte Remoto** - Assistência técnica via conexão remota (24/7)

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas em `client/src/index.css`

### Conteúdo
Textos e conteúdos podem ser editados em `client/src/pages/Home.tsx`

### Serviços
Adicione ou modifique serviços editando o enum em `drizzle/schema.ts`

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do formulário no site.

## 📄 Licença

MIT License - Desenvolvido em 2025
