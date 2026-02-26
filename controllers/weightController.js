const { WeightEntry } = require('../models');

exports.getWeight = async (req, res) => {
    const entries = await WeightEntry.findAll({ 
        where: { UserId: req.session.userId },
        order: [['date', 'ASC']] 
    });
    const today = new Date().toISOString().split('T')[0];
    res.render('weight', { entries, today });
};

exports.postWeight = async (req, res) => {
    await WeightEntry.create({
        weight: req.body.weight,
        date: req.body.date,
        UserId: req.session.userId
    });
    res.redirect('/weight');
};