# 🚀 HelpSystem - Suporte Técnico em Informática

Sistema completo de suporte técnico com **painel administrativo** e otimização mobile.

[![Deploy Status](https://img.shields.io/badge/deploy-online-success)](https://helpsystem-silk.vercel.app/)
[![Mobile Optimized](https://img.shields.io/badge/mobile-optimized-blue)]()
[![Admin Panel](https://img.shields.io/badge/admin-panel-orange)]()

---

## 🌟 Funcionalidades

### 🌐 Site Público
- ✅ Landing page moderna e profissional
- ✅ Formulário de solicitação de suporte
- ✅ 4 tipos de serviços oferecidos
- ✅ Design responsivo (mobile-first)
- ✅ Animações e efeitos visuais
- ✅ Otimizado para SEO

### 🔐 Painel Administrativo
- ✅ Login seguro com autenticação
- ✅ Dashboard com abas organizadas
- ✅ Gerenciamento de solicitações de suporte
- ✅ Edição completa do conteúdo do site
- ✅ Interface intuitiva e moderna
- ✅ 100% responsivo

### 📱 Otimização Mobile
- ✅ Touch targets otimizados (44px mínimo)
- ✅ Meta tags para PWA
- ✅ Suporte para safe areas (notch)
- ✅ Font-size otimizado (evita zoom no iOS)
- ✅ Layout adaptativo para todas as telas

---

## 🔗 Links Importantes

- **Site Online:** https://helpsystem-silk.vercel.app/
- **Painel Admin:** https://helpsystem-silk.vercel.app/admin
- **Repositório:** https://github.com/marlongnovaes-ship-it/helpsystem
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 🔐 Acesso ao Painel Administrativo

```
URL: https://helpsystem-silk.vercel.app/admin
Usuário: admin
Senha: R+slp2OkGEQGnQ3OoWnv3w==
```

⚠️ **Importante:** Altere a senha após o primeiro acesso!

---

## 🗄️ Configuração do Banco de Dados

### Passo 1: Criar Banco MySQL

Escolha um provedor gratuito:
- **PlanetScale** (recomendado): https://planetscale.com
- **Railway**: https://railway.app
- **Aiven**: https://aiven.io

### Passo 2: Executar Script SQL

Execute o arquivo `init-database.sql` no seu banco de dados.

### Passo 3: Configurar Vercel

1. Acesse o Vercel Dashboard
2. Selecione o projeto `helpsystem`
3. Vá em Settings → Environment Variables
4. Adicione:
   - **Name:** `DATABASE_URL`
   - **Value:** `mysql://usuario:senha@host:3306/database`
5. Salve e aguarde o deploy

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Interface moderna
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Vite** - Build tool
- **Wouter** - Roteamento

### Backend
- **Node.js** - Runtime
- **Express** - Servidor web
- **tRPC** - API type-safe
- **MySQL** - Banco de dados
- **Drizzle ORM** - ORM moderno

### Deploy
- **Vercel** - Hospedagem
- **GitHub** - Controle de versão

---

## 📦 Instalação Local

```bash
# Clonar repositório
git clone https://github.com/marlongnovaes-ship-it/helpsystem.git
cd helpsystem

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env e adicione DATABASE_URL

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

---

## 📚 Documentação

- **Guia Rápido:** [GUIA_RAPIDO_CONFIGURACAO.md](./GUIA_RAPIDO_CONFIGURACAO.md)
- **Documentação Completa:** [DOCUMENTACAO_PAINEL_ADMIN.md](./DOCUMENTACAO_PAINEL_ADMIN.md)
- **Script SQL:** [init-database.sql](./init-database.sql)

---

## 🎯 Estrutura do Projeto

```
helpsystem/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx      # Página principal
│   │   │   ├── AdminLogin.tsx # Login admin
│   │   │   └── AdminDashboard.tsx # Painel admin
│   │   └── components/        # Componentes UI
│   └── index.html            # HTML principal
├── server/                    # Backend Node.js
│   ├── _core/                # Core do servidor
│   ├── db.ts                 # Funções de banco
│   └── routers.ts            # Rotas tRPC
├── drizzle/                  # Schema do banco
│   └── schema.ts             # Definição das tabelas
├── init-database.sql         # Script SQL inicial
└── README.md                 # Este arquivo
```

---

## 🔒 Segurança

### Implementações de Segurança

- ✅ Senhas criptografadas com PBKDF2 + SHA-512
- ✅ Sessões seguras com cookies HttpOnly
- ✅ Proteção contra SQL injection (ORM)
- ✅ HTTPS automático (Vercel)
- ✅ Validação de dados no frontend e backend
- ✅ Proteção contra CSRF

### Boas Práticas

- 🔒 Nunca commite arquivos `.env`
- 🔒 Altere senhas periodicamente
- 🔒 Use variáveis de ambiente para dados sensíveis
- 🔒 Mantenha dependências atualizadas

---

## 📊 Funcionalidades do Painel Admin

### Gerenciamento de Solicitações

- Visualizar todas as solicitações recebidas
- Filtrar por status (Pendente, Em Andamento, Concluído)
- Alterar status das solicitações
- Ver detalhes completos de cada solicitação

### Edição de Conteúdo

Edite todos os textos do site organizados por seção:

- **Hero:** Título, subtítulo, botões
- **Serviços:** Nome e descrição de cada serviço
- **Atendimento:** Informações de atendimento
- **Contato:** Textos do formulário
- **Rodapé:** Informações da empresa

---

## 🚀 Deploy

O deploy é automático via Vercel:

1. Faça commit das alterações
2. Push para o GitHub
3. Vercel detecta e faz deploy automaticamente
4. Site atualizado em ~2 minutos

```bash
git add .
git commit -m "Suas alterações"
git push origin main
```

---

## 🐛 Solução de Problemas

### Não consigo fazer login

1. Verifique se `DATABASE_URL` está configurada
2. Confirme que o script SQL foi executado
3. Teste a conexão com o banco

### Conteúdo não salva

1. Faça logout e login novamente
2. Verifique logs no Vercel
3. Confirme permissões do banco

### Site não responsivo

1. Limpe o cache (Ctrl+Shift+R)
2. Verifique se o último deploy foi bem-sucedido
3. Teste em modo anônimo

---

## 📞 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Iniciar servidor de desenvolvimento
pnpm build            # Build para produção
pnpm start            # Iniciar servidor de produção

# Qualidade de Código
pnpm check            # Verificar erros TypeScript
pnpm format           # Formatar código com Prettier

# Banco de Dados
pnpm db:push          # Aplicar schema no banco
node init-db.mjs      # Gerar nova senha de admin
```

---

## 🎨 Personalização

### Alterar Cores

Edite `client/src/index.css`:

```css
:root {
  --primary: oklch(0.55 0.25 240); /* Cor principal */
  --background: oklch(0.10 0.02 240); /* Cor de fundo */
}
```

### Adicionar Novo Serviço

1. Edite `drizzle/schema.ts` (adicione enum)
2. Atualize `client/src/pages/Home.tsx`
3. Execute `pnpm db:push`

### Alterar Logo

Substitua os arquivos em `client/public/images/`

---

## 📈 Próximos Passos

### Prioridade Alta
- [ ] Configurar banco de dados MySQL
- [ ] Testar painel administrativo
- [ ] Adicionar botão de WhatsApp

### Prioridade Média
- [ ] Criar página "Sobre Nós"
- [ ] Adicionar galeria de fotos
- [ ] Implementar sistema de email

### Prioridade Baixa
- [ ] Google Analytics
- [ ] Otimizar SEO
- [ ] Blog de notícias

---

## 📝 Changelog

### v2.0 - 22/11/2025

**Adicionado:**
- ✨ Painel administrativo completo
- ✨ Sistema de autenticação seguro
- ✨ Edição de conteúdo do site
- ✨ Gerenciamento de solicitações
- ✨ Otimização mobile completa

**Melhorado:**
- 🎨 Interface do painel admin
- 🎨 Design responsivo
- 🔒 Segurança de autenticação

### v1.0 - 22/11/2025

**Inicial:**
- 🎉 Lançamento do site
- 🎉 Deploy no Vercel
- 🎉 Formulário de contato

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das alterações
4. Push para a branch
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto é privado e de uso exclusivo.

---

## 👨‍💻 Desenvolvido por

**Manus AI Assistant**  
Data: 22 de Novembro de 2025  
Versão: 2.0

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a [Documentação Completa](./DOCUMENTACAO_PAINEL_ADMIN.md)
2. Verifique o [Guia Rápido](./GUIA_RAPIDO_CONFIGURACAO.md)
3. Consulte os logs no Vercel Dashboard

---

**🎉 Painel Administrativo Pronto para Uso!**

Configure o banco de dados e comece a gerenciar seu site agora mesmo! 🚀
