const express = require('express');
const router = express.Router();
const weightController = require('../controllers/weightController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/weight', isAuthenticated, weightController.getWeight);

router.post('/weight', isAuthenticated, weightController.postWeight);

module.exports = router;