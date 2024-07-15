const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const sgMail = require('@sendgrid/mail');

// Configuration de l'API Key SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route pour créer une nouvelle commande
router.post('/orders', auth, async (req, res) => {
  const { medicineId, quantity, status } = req.body;
  try {
    const order = await createOrder(medicineId, quantity, status);

    // Envoi d'un email de notification
    const msg = {
      to: 'recipient@example.com', // Adresse email du destinataire
      from: 'sender@example.com',   // Adresse email de l'expéditeur
      subject: 'Nouvelle commande de médicament',
      text: `Une nouvelle commande de médicament a été créée avec succès.`,
    };
    await sgMail.send(msg);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Error creating order' });
  }
});

// Route pour récupérer toutes les commandes
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
