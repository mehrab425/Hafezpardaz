#!/bin/sh
set -e

cd /app

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding admin user..."
node seed-docker.js || true

echo "Starting server on port ${PORT:-3000}..."
exec node .next/standalone/server.js
