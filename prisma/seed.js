const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordUser = await bcrypt.hash('user123', 10);

  await prisma.user.createMany({
    data: [
      { username: 'admin', email: 'admin@chu.com', password: hashedPasswordAdmin },
      { username: 'user', email: 'user@chu.com', password: hashedPasswordUser },
    ],
  });

  await prisma.medicine.createMany({
    data: [
      {
        name: 'Aspirin',
        description: 'Pain reliever',
        form: 'Tablet',
        dosage: '500mg',
        code: 'ASP123',
        manufacturer: 'Pharma Inc',
        expiryDate: new Date('2024-01-01'),
        batch: 'B123',
        quantity: 100,
        price: 0.10,
        storageInfo: 'Room temperature',
        warnings: 'None',
        interactions: 'None',
        contraindications: 'None',
        fertility: 'Safe',
        dosageInstructions: 'Take 1 tablet every 4 hours'
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
