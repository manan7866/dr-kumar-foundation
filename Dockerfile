# ─────────────────────────────────────────────────────────────────────────────
# Multi-Stage Dockerfile for Next.js Application
# Dr. Kumar Foundation Website
# ─────────────────────────────────────────────────────────────────────────────

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Dependencies
# Install all dependencies (both dev and production)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl curl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Copy prisma schema (needed for prisma generate in postinstall)
COPY prisma ./prisma

# Try multiple npm registry mirrors for better reliability
ARG NPM_REGISTRY=https://registry.npmjs.org/
RUN npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 180000 && \
    npm config set fetch-timeout 180000 && \
    npm config set registry ${NPM_REGISTRY} && \
    npm config set maxsockets 1

# Install dependencies - use npm install with offline preference
RUN npm install --prefer-offline --no-audit --no-fund || \
    npm install --no-audit --no-fund || \
    (echo "Retrying with clean cache..." && npm cache clean --force && npm install --no-audit --no-fund)

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Builder
# Build the Next.js application
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Set all required environment variables for build
ARG DATABASE_URL="postgresql://dkf_user:dkf123987%;@localhost:5432/dkf_db"

ARG NEXTAUTH_URL="http://localhost:3000"
ARG NEXTAUTH_SECRET="4f9c2a7e6d1b8c5f3e9a2d7c6b1f8e4a9c3d6e7b2f1a8c5d"
ARG CLOUDINARY_CLOUD_NAME="dypdtkbzc"
ARG CLOUDINARY_API_KEY="532891418414274"
ARG CLOUDINARY_API_SECRET="_tI0HsvFvOcm39dqwwyxs2tsg3Y"
ARG RESEND_API_KEY="re_erB6mRvH_3Q8T6DbGF3zVkKMH2rMSUSxs"
ARG EMAIL_FROM="Dr. Kumar Foundation <info@sufisciencecenter.info>"

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV EMAIL_FROM=${EMAIL_FROM}

# Configure npm for reliability
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Build the application
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3: Runner (Production)
# Minimal production image with only necessary files
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl curl

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Set hostname to allow external access
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
