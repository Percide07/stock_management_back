// controllers/exchangeController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Créer une nouvelle demande d'échange
const createExchangeRequest = async (req, res) => {
  const { requesterHospital, requestedMedicine, urgencyLevel, quantity } = req.body;

  try {
    const exchangeRequest = await prisma.exchangeRequest.create({
      data: {
        requesterHospital,
        requestedMedicine,
        urgencyLevel,
        quantity,
        status: 'Pending', // Par défaut, la demande est en attente de validation
      },
    });
    res.status(201).json(exchangeRequest);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la demande d\'échange' });
  }
};

// Valider une demande d'échange par le CHU
const validateExchangeRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);
  
  try {
    // Vérifier si la demande existe
    const existingRequest = await prisma.exchangeRequest.findUnique({
      where: { id: requestId },
    });

    if (!existingRequest) {
      return res.status(404).json({ error: 'Demande d\'échange non trouvée' });
    }

    // Valider la demande en fonction de la disponibilité et de l'urgence (logique métier à implémenter)
    // Exemple de validation simplifiée :
    const isAvailable = true; // Logique de validation à implémenter
    if (isAvailable) {
      await prisma.exchangeRequest.update({
        where: { id: requestId },
        data: { status: 'Validated' },
      });
      res.status(200).json({ message: 'Demande d\'échange validée avec succès' });
    } else {
      res.status(400).json({ error: 'La demande ne peut pas être validée pour le moment' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la validation de la demande d\'échange' });
  }
};

// Générer un bon de livraison après validation
const generateDeliveryNote = async (req, res) => {
  const requestId = parseInt(req.params.id);

  try {
    const deliveryNote = await prisma.deliveryNote.create({
      data: {
        exchangeRequestId: requestId,
        // Autres détails du bon de livraison à générer
      },
    });
    res.status(201).json(deliveryNote);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la génération du bon de livraison' });
  }
};

// Obtenir toutes les demandes d'échange
const getExchangeRequests = async (req, res) => {
  try {
    const exchangeRequests = await prisma.exchangeRequest.findMany();
    res.status(200).json(exchangeRequests);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des demandes d\'échange' });
  }
};

// Obtenir une demande d'échange spécifique
const getExchangeRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  try {
    const exchangeRequest = await prisma.exchangeRequest.findUnique({
      where: { id: requestId },
    });
    if (!exchangeRequest) {
      return res.status(404).json({ error: 'Demande d\'échange non trouvée' });
    }
    res.status(200).json(exchangeRequest);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la demande d\'échange' });
  }
};

module.exports = {
  createExchangeRequest,
  validateExchangeRequest,
  generateDeliveryNote,
  getExchangeRequests,
  getExchangeRequest,
};
