# Usamos una imagen base de Node.js
FROM node:18 AS builder

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración de las dependencias
COPY package.json pnpm-lock.yaml    ./

# Instalamos las dependencias usando pnpm
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación
RUN pnpm build --no-lint


# Ahora configuramos la imagen final para producción
FROM node:18

# Instalamos pnpm de nuevo para usarlo en la imagen final
RUN npm install -g pnpm

WORKDIR /app

# Copiamos solo lo necesario de la etapa de construcción
COPY --from=builder /app ./

# Exponemos el puerto donde correrá la aplicación
EXPOSE 3000

# Definimos el comando para correr la app
CMD ["pnpm", "start"]
