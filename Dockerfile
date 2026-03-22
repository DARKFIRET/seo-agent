# Этап 1: Сборка
FROM node:22-alpine AS builder

WORKDIR /app

# Включаем pnpm
RUN corepack enable pnpm

# Устанавливаем необходимые пакеты для сборки нативных модулей и совместимости SWC/esbuild
RUN apk add --no-cache python3 make g++ libc6-compat

# Копируем файлы зависимостей (включая скрытый .npmrc, если он есть)
COPY package.json pnpm-lock.yaml tsconfig.json .npmrc* ./

# Устанавливаем зависимости (без жесткой привязки к Windows-версиям пакетов из lockfile)
RUN pnpm install --no-frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем клиент (SPA) и сервер
RUN pnpm run build

# Этап 2: Production-окружение
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Копируем только то, что нужно для продакшена
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Создаем папку для загрузок, если её нет
RUN mkdir -p public/uploads

EXPOSE 3000

CMD ["npm", "run", "start"]
