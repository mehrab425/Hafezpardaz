#!/bin/sh
set -e

cd /app

# Runtime secrets must come from the platform env (ParsPack), not the image.
if [ -z "${AUTH_SECRET:-}" ] && [ -z "${NEXTAUTH_SECRET:-}" ]; then
  echo "WARNING: AUTH_SECRET / NEXTAUTH_SECRET is not set. Admin login will fail in production."
fi

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding admin user (idempotent upsert)..."
node seed-docker.js || true

PORT_VALUE="${PORT:-3000}"
export PORT="$PORT_VALUE"
echo "Starting Next.js standalone server on port ${PORT_VALUE}..."
# This is Next.js-generated server — NOT a legacy Express src/server.js
exec node .next/standalone/server.js
