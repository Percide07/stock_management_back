// routes/exchangeRoutes.js

const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

// Endpoint pour créer une nouvelle demande d'échange
router.post('/exchange-request', exchangeController.createExchangeRequest);

// Endpoint pour valider une demande d'échange par le CHU
router.put('/exchange-request/:id/validate', exchangeController.validateExchangeRequest);

// Endpoint pour générer un bon de livraison après validation
router.post('/exchange-request/:id/generate-delivery-note', exchangeController.generateDeliveryNote);

// Endpoint pour suivre les demandes d'échange
router.get('/exchange-requests', exchangeController.getExchangeRequests);
router.get('/exchange-request/:id', exchangeController.getExchangeRequest);

module.exports = router;
