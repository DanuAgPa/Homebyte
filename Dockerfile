# Stage 1: Build
FROM node:22-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

# Copy package.json dan lockfile
COPY package*.json ./

# PERBAIKAN: Menggunakan --legacy-peer-deps agar tidak bentrok React 18 & 19
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy semua kode aplikasi
COPY . .

# Generate Prisma Client (Wajib agar tidak error saat build)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

# Build aplikasi Next.js
RUN npm run build

# Stage 2: Production Run
FROM node:22-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app
ENV NODE_ENV=production

# Keamanan: Jangan jalankan sebagai root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Ambil hasil build dari stage builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Port default Next.js
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]