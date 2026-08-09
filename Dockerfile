FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Install all dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Environment for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="file:./prisma/dev.db"
ENV NEXTAUTH_SECRET="HafezPardazSepehr2024ChangeThis"
ENV NEXTAUTH_URL="http://localhost:3000"

# Generate Prisma client then build Next.js
RUN npx prisma generate
RUN npm run build

# Copy static assets into standalone output directory
RUN cp -r public .next/standalone/public && \
    mkdir -p .next/standalone/.next && \
    cp -r .next/static .next/standalone/.next/static

# Create required runtime directories
RUN mkdir -p storage/uploads prisma

EXPOSE 3000

CMD ["sh", "./docker-start.sh"]
