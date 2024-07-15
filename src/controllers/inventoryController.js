const prisma = require('../../config/db');

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addMedicine = async (req, res) => {
  const { name, description, form, dosage, code, manufacturer, expiryDate, batch, quantity, price, storageInfo, warnings, interactions, contraindications, fertility, dosageInstructions } = req.body;
  try {
    const medicine = await prisma.medicine.create({
      data: {
        name,
        description,
        form,
        dosage,
        code,
        manufacturer,
        expiryDate,
        batch,
        quantity,
        price,
        storageInfo,
        warnings,
        interactions,
        contraindications,
        fertility,
        dosageInstructions
      },
    });
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ error: 'Error adding medicine' });
  }
};
