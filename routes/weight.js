const express = require('express');
const router = express.Router();
const { WeightEntry } = require('../models');

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

router.get('/dashboard', isAuthenticated, async (req, res) => {
    const entries = await WeightEntry.findAll({ 
        where: { UserId: req.session.userId },
        order: [['date', 'ASC']] 
    });
    res.render('dashboard', { entries });
});

router.post('/weight', isAuthenticated, async (req, res) => {
    await WeightEntry.create({
        weight: req.body.weight,
        date: req.body.date,
        UserId: req.session.userId
    });
    res.redirect('/dashboard');
});

module.exports = router;