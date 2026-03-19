# ─────────────────────────────────────────────────────────────────────────────
# Production Dockerfile - Dr. Kumar Foundation Website
# Optimized for minimal image size (~360MB)
# ─────────────────────────────────────────────────────────────────────────────

# ─────────────────────────────────────────────────────────────────────────────
# Stage 0: Base
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base

RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates \
    tzdata \
    dumb-init

ENV TZ=UTC
ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Dependencies
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci \
    --prefer-offline \
    --no-audit \
    --no-fund \
    --ignore-scripts

RUN npx prisma generate

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Builder
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .

ARG NEXTAUTH_URL
ARG DATABASE_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}
ENV DATABASE_URL=${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/postgres}

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3: Runner - Minimal production runtime (~360MB)
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS runner

RUN apk add --no-cache curl dumb-init

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the built application (standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy Prisma client only
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "server.js"]
