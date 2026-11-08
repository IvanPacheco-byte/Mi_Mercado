# Etapa 1: Compilar la app de Angular/Ionic
FROM node:22-alpine AS build
WORKDIR /app

# Copiar archivos de configuración e instalar dependencias limpias
COPY package*.json ./
RUN npm ci

# Copiar todo el código de la aplicación
COPY . .

# Compilar el proyecto para producción (genera la carpeta www)
RUN npm run build -- --configuration=production

# Etapa 2: Servir la app compilada usando un servidor Nginx
FROM nginx:alpine
# Copiamos los archivos estáticos generados al directorio público de Nginx
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
