# build stage
FROM node:16.16.0-alpine AS builder

# Buat direktori /app di dalam container
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# prod stage
FROM node:16.16.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["npm", "run", "start:migrate:prod"]