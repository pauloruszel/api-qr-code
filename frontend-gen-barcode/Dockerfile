# Etapa de construção
FROM node:16 AS build

WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código fonte do aplicativo
COPY . .

# Construa o aplicativo
RUN npm run build

# Etapa de execução
FROM nginx:alpine

# Copie os arquivos de construção do estágio de construção
COPY --from=build /app/dist/frontend-gen-barcode /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]