// orderController.js

const prisma = require('../../config/db');
const { sendEmail } = require('../services/emailService');

exports.createOrder = async (req, res) => {
  const { medicineId, quantity, status } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        medicineId,
        quantity,
        status,
      },
    });

    // Envoyer une notification par email
    const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } });
    const userEmail = "/* Récupérez l'email de l'utilisateur à notifier */";
    const subject = 'Nouvelle commande enregistrée';
    const text = `Votre commande pour ${quantity} unité(s) de ${medicine.name} a été enregistrée avec succès.`;
    const html = `<p>Votre commande pour ${quantity} unité(s) de ${medicine.name} a été enregistrée avec succès.</p>`;

    await sendEmail(userEmail, subject, text, html);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Error creating order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
