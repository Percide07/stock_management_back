const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateStock(medicineId, quantity) {
  return await prisma.medicine.update({
    where: { id: medicineId },
    data: { quantity },
  });
}

async function getStockLevels() {
  return await prisma.medicine.findMany({
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });
}

module.exports = {
  updateStock,
  getStockLevels,
};
