# url-shortener

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

Aplicação MVP de um encurtador de URL, com backend construído em Node.js e TypeScript.

## Funcionalidades

- Encurtar uma URL (`POST /api/shorten`)
- Redirecionar para a URL original (`GET /{shortCode}`)

## Uso da API

### Encurtar uma URL

Envie uma requisição POST para `/api/shorten` com a URL original no corpo da requisição.

- **Endpoint:** `POST /api/shorten`
- **Corpo da Requisição (Body):**
  ```json
  {
    "originalUrl": "https://github.com/maats01"
  }
- **Resposta de sucesso:**
  ```json
  {
    "shortUrl": "http://localhost:3333/aB1cD2eF"
  }

### Redirecionar para a URL original

Acesse a URL raiz da aplicação seguida pelo código curto gerado.

- **Endpoint:** `GET /{shortCode}`
- **Exemplo:** Acesse `http://localhost:3333/aB1cD2eF` no seu navegador.
- **Resultado:** Você será redirecionado (HTTP 302) para a URL original correspondente. 

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express.js
- Prisma
- MySQL

## Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/maats01/url-shortener.git
```

### 2. Instalar dependências
Dentro do diretório `backend`, rodar:
```bash
npm install
```

### 3. Configurar o ambiente
Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`:
```bash
cp .env.example .env
```
Em seguida, edite o arquivo `.env` com as informações de conexão do seu banco de dados MySQL.

### 4. Executar as migrations do prisma
```bash
npx prisma migrate dev
```

### 5. Iniciar a aplicação
Dentro do diretório `backend`, rodar:
```bash
npm run dev
```
