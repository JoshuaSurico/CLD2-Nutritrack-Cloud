const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/today', isAuthenticated, foodController.getToday);

router.get('/add-food', isAuthenticated, foodController.getAddFood);
router.post('/add-food', isAuthenticated, foodController.postAddFood);

module.exports = router;