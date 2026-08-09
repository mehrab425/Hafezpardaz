const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

bcrypt.hash('admin123456', 12)
  .then(function(hash) {
    return prisma.user.upsert({
      where: { email: 'admin@hafezpardaz.ir' },
      update: {},
      create: {
        email: 'admin@hafezpardaz.ir',
        password: hash,
        name: 'مدیر سیستم',
        role: 'ADMIN'
      }
    });
  })
  .then(function() {
    console.log('admin@hafezpardaz.ir ready');
    return prisma.$disconnect();
  })
  .catch(function(e) {
    console.log('seed note: ' + e.message);
    return prisma.$disconnect();
  });
