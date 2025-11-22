# 🔐 Credenciais Completas do Sistema HelpSystem

## 📊 Banco de Dados MySQL (FreeSQLDatabase)

```
Host: sql10.freesqldatabase.com
Port: 3306
Database: sql10808988
Username: sql10808988
Password: NTKefunk5v
```

**DATABASE_URL para Vercel:**
```
mysql://sql10808988:NTKefunk5v@sql10.freesqldatabase.com:3306/sql10808988
```

**phpMyAdmin:**
- URL: http://www.phpmyadmin.co
- Use as credenciais acima para acessar

---

## 🎛️ Painel Administrativo

**URL:** https://helpsystem-silk.vercel.app/admin

**Credenciais de Login:**
```
Usuário: admin
Senha: R+slp2OkGEQGnQ3OoWnv3w==
```

---

## 🌐 FreeSQLDatabase Account

**URL:** https://www.freesqldatabase.com/account/

**Login:**
```
Email: marlongnovaes@gmail.com
Senha: HelpSystem2024!@MySQL#Strong
Account Number: 1526480
```

---

## ⚙️ Como Configurar a DATABASE_URL no Vercel

### Opção 1: Via Interface Web (Recomendado)

1. Acesse: https://vercel.com/marlon-gnovaess-projects/helpsystem/settings/environment-variables
2. Clique em "Add New"
3. **Key:** `DATABASE_URL`
4. **Value:** `mysql://sql10808988:NTKefunk5v@sql10.freesqldatabase.com:3306/sql10808988`
5. Selecione todos os ambientes (Production, Preview, Development)
6. Clique em "Save"
7. Faça um novo deploy (push no GitHub ou redeploy manual)

### Opção 2: Via CLI

```bash
vercel env add DATABASE_URL
# Cole o valor: mysql://sql10808988:NTKefunk5v@sql10.freesqldatabase.com:3306/sql10808988
# Selecione: Production, Preview, Development
```

---

## 📋 Próximos Passos

1. ✅ Banco de dados MySQL criado e inicializado
2. ✅ Tabelas criadas (users, supportRequests, siteContent, adminUsers)
3. ✅ Dados iniciais inseridos
4. ✅ Usuário admin criado
5. ⏳ **PENDENTE:** Adicionar DATABASE_URL no Vercel
6. ⏳ **PENDENTE:** Fazer redeploy do site
7. ⏳ **PENDENTE:** Testar login no painel admin

---

## 🎯 Funcionalidades do Painel Administrativo

- ✅ Login seguro com senha criptografada
- ✅ Gerenciar solicitações de suporte
- ✅ Editar todo o conteúdo do site:
  - Hero (título, subtítulo)
  - Serviços (4 serviços com título e descrição)
  - Atendimento (título e descrição)
  - Contato (título e subtítulo)
  - Rodapé (nome, descrição, email, telefone)
- ✅ Interface responsiva (funciona em celular)
- ✅ Atualizações em tempo real

---

## 🔒 Segurança

- ✅ Senha do admin criptografada com PBKDF2 + SHA-512
- ✅ Sessões seguras com cookies HttpOnly
- ✅ Proteção contra SQL Injection (prepared statements)
- ✅ Validação de entrada em todos os formulários

---

## 📱 Otimizações Mobile

- ✅ Design 100% responsivo
- ✅ Touch targets otimizados (mínimo 44px)
- ✅ Meta tags para PWA
- ✅ Font-size ajustado (evita zoom automático)
- ✅ Suporte para safe areas (notch)

---

## 📞 Suporte

Em caso de problemas:
1. Verifique se a DATABASE_URL está configurada no Vercel
2. Verifique se o banco está ativo em https://www.freesqldatabase.com/account/
3. Teste a conexão via phpMyAdmin: http://www.phpmyadmin.co

---

**Data de Criação:** 22 de Novembro de 2025
**Status:** ✅ Banco configurado | ⏳ Aguardando configuração no Vercel
