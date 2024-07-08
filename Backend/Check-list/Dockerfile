# Stage 1: Build
FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g serve
RUN npm install
COPY . .

# Stage 2: Production
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3001"]

EXPOSE 3001
