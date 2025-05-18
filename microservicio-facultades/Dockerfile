# Imagen base de Node
FROM node:18

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto desde .env
EXPOSE 5000

# Comando para correr la app
CMD ["node", "server.js"]