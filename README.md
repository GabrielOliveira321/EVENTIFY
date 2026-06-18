# Eventify

## 🚀 Como rodar o projeto

### Backend

O backend funciona **100%** quando executado em conjunto com o Docker, que sobe o banco de dados PostgreSQL.

```bash
# 1. Suba o banco de dados com Docker
cd backend
docker compose up -d

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm run start:dev
```

> ⚠️ Certifique-se de que o arquivo de variáveis de ambiente (.env) está configurado corretamente com a `JWT_SECRET` e as credenciais do banco de dados.
