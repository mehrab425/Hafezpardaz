/**
 * Idempotent production-safe seed:
 * - upserts admin by unique email (does not overwrite password if user exists)
 * - never drops tables or deletes users
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const ADMIN_EMAIL = 'admin@hafezpardaz.ir';

bcrypt.hash('admin123456', 12)
  .then(function(hash) {
    return prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {},
      create: {
        email: ADMIN_EMAIL,
        password: hash,
        name: 'مدیر سیستم',
        role: 'ADMIN'
      }
    });
  })
  .then(function() {
    console.log('Admin user ready (upsert): ' + ADMIN_EMAIL);
    return prisma.$disconnect();
  })
  .catch(function(e) {
    console.log('seed note: ' + e.message);
    return prisma.$disconnect();
  });
