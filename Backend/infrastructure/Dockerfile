# Etapa de construcción
FROM node:alpine as builder
WORKDIR /
COPY package*.json ./
COPY ormconfig*.json /
RUN npm install
  
# Etapa de producción
FROM node:alpine
WORKDIR /
COPY --from=builder /package*.json ./
COPY dist ./dist
COPY --from=builder /node_modules ./node_modules
COPY --from=builder ormconfig*.json ./
CMD ["node", "/dist/main.js"]

EXPOSE 3000