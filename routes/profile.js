const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/profile', isAuthenticated, profileController.getProfile);
router.post('/profile', isAuthenticated, profileController.postProfile);

module.exports = router;