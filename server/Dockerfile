FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando para iniciar la aplicación web y el servidor Node
CMD ["node", "server.js"]