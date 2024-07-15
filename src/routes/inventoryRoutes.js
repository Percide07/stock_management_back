const express = require('express');
const { getAllMedicines, addMedicine } = require('../controllers/inventoryController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get('/medicines', auth, getAllMedicines);
router.post('/medicines', auth, addMedicine);

module.exports = router;
