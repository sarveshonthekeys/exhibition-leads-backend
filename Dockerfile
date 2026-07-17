# syntax=docker/dockerfile:1

##############################
#  Stage 1 — the workshop
#  Installs everything, generates Prisma, compiles TypeScript.
#  This stage is thrown away at the end; only its output survives.
##############################
FROM node:22-bookworm-slim AS builder

# Prisma's query engine links against OpenSSL. The "slim" images leave it
# out to save space, so we put it back or Prisma cannot start.
# ca-certificates matters too: the engine is a Rust binary that uses the
# SYSTEM trust store (not Node's built-in one) to verify Azure SQL's TLS
# certificate. Without it: "unable to get local issuer certificate".
RUN apt-get update -y \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy ONLY the manifests + prisma schema first.
# Two reasons:
#   1. Docker caches this layer, so npm ci is skipped on rebuilds
#      unless package.json actually changed.
#   2. The prisma/ folder must already exist, because package.json runs
#      "postinstall": "prisma generate" during install.
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Installs ALL dependencies, including the prisma CLI (a devDependency).
# postinstall then generates the Prisma Client HERE, on Linux — so the
# query engine it downloads is a Linux engine. This is the whole point.
RUN npm ci

# Now the source code, then compile TypeScript -> dist/
COPY . .
RUN npm run build


##############################
#  Stage 2 — the shipping container
#  Starts from a clean image. Takes only the finished goods.
##############################
FROM node:22-bookworm-slim AS runner

# Same as stage 1: OpenSSL for the engine, ca-certificates so it can
# verify Azure SQL's TLS certificate.
RUN apt-get update -y \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY prisma ./prisma

# Production dependencies only — no TypeScript, no NestJS CLI, no test tools.
# --ignore-scripts is REQUIRED: the prisma CLI is a devDependency, so it is
# not installed here, and postinstall's "prisma generate" would crash.
RUN npm ci --omit=dev --ignore-scripts

# Instead of regenerating, take the Prisma Client that stage 1 already
# built on Linux. Correct engine, zero extra work.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# And the compiled application.
COPY --from=builder /app/dist ./dist

# Documentation only. main.ts listens on process.env.PORT || 3003,
# so Azure can inject whichever port it likes.
EXPOSE 3003

CMD ["node", "dist/src/main.js"]
