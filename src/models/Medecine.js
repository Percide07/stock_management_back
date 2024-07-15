const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMedicine(data) {
  return await prisma.medicine.create({ data });
}

async function getAllMedicines() {
  return await prisma.medicine.findMany();
}

async function getMedicineById(id) {
  return await prisma.medicine.findUnique({ where: { id } });
}

async function updateMedicine(id, data) {
  return await prisma.medicine.update({
    where: { id },
    data,
  });
}

async function deleteMedicine(id) {
  return await prisma.medicine.delete({ where: { id } });
}

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
