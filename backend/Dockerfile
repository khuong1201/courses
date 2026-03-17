# Build stage
FROM node:20-alpine AS builder

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies for the build
RUN npm install --legacy-peer-deps

# Generate Prisma Client
RUN npx prisma generate

# Copy source code and build the application
COPY . .
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

# Use Render's PORT environment variable or default to 3000
ENV PORT=3000
EXPOSE ${PORT}

# Start the server
CMD ["node", "dist/main"]
