const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createOrder(data) {
  return await prisma.order.create({ data });
}

async function getAllOrders() {
  return await prisma.order.findMany();
}

async function getOrderById(id) {
  return await prisma.order.findUnique({ where: { id } });
}

async function updateOrder(id, data) {
  return await prisma.order.update({
    where: { id },
    data,
  });
}

async function deleteOrder(id) {
  return await prisma.order.delete({ where: { id } });
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
