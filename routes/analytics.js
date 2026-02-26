const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/analytics', isAuthenticated, analyticsController.getAnalytics);

module.exports = router;