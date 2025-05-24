# Imagem base com Node.js (versão 16-alpine)
FROM node:16-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o container
COPY . .

# Gera o Prisma Client e executa as migrations
RUN npx prisma generate
RUN npx prisma migrate deploy

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta na qual a API irá rodar
EXPOSE 4000

# Comando para iniciar a aplicação (ajuste conforme seu script de start)
CMD ["node", "dist/index.js"]