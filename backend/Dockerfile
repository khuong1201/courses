# Build stage
FROM node:20-alpine AS builder

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies for the build
RUN npm install --legacy-peer-deps

# Copy source code and config files early for Prisma generate
COPY . .

# Set a dummy DATABASE_URL for generate step if needed by prisma.config.ts
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/nest-cli.json ./
COPY --from=builder /usr/src/app/tsconfig*.json ./
COPY --from=builder /usr/src/app/prisma.config.js ./

# Use Render's PORT environment variable or default to 3000
ENV PORT=3000
EXPOSE ${PORT}

# Start the server: run migrations first, then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
