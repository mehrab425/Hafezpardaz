#!/bin/sh
set -e

cd /app

# Reuse the same production entry as ParsPack npm start
exec node server.js
