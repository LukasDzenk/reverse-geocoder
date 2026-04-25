# =============================================================================
# STAGE 1: Build Stage
# =============================================================================
FROM public.ecr.aws/docker/library/node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Set up pnpm via corepack with a shared store dir (cached between stages)
RUN corepack enable && \
    mkdir -p /pnpm-store && \
    pnpm config set store-dir /pnpm-store

# Install dependencies (including dev deps needed for build)
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# =============================================================================
# STAGE 2: Production Runtime Stage
# =============================================================================
FROM public.ecr.aws/docker/library/node:22-alpine AS runtime

# dumb-init for proper signal forwarding; non-root user for least privilege
RUN apk add --no-cache dumb-init && \
    corepack enable && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY --chown=nodejs:nodejs package.json pnpm-lock.yaml ./

# Install production dependencies, reusing the builder's pnpm store
RUN --mount=from=builder,source=/pnpm-store,target=/pnpm-store \
    pnpm config set store-dir /pnpm-store && \
    pnpm install --frozen-lockfile --prod

# local-reverse-geocoder downloads city data into its own package dir at boot,
# so node_modules must be writable by the runtime user
RUN chown -R nodejs:nodejs /app/node_modules

# Copy the compiled output and runtime static assets
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist
COPY --chown=nodejs:nodejs --from=builder /app/src/public ./src/public

USER nodejs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["pnpm", "start"]
