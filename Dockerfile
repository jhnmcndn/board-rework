FROM node:18 AS base

ENV NODE_OPTIONS="--max_old_space_size=4096"

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y curl bash
WORKDIR /app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN \
  if [ -f bun.lockb ]; then bun install; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
RUN apt-get update && apt-get install -y curl bash
WORKDIR /app

# Install Bun again in the builder stage
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ENVIRONMENT
RUN \
  if [ -f bun.lockb ]; then bun run build-${ENVIRONMENT}; \
  elif [ -f yarn.lock ]; then yarn run build-${ENVIRONMENT}; \
  elif [ -f package-lock.json ]; then npm run build-${ENVIRONMENT}; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build-${ENVIRONMENT}; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN groupadd --system nodejs && useradd --system --gid nodejs nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
