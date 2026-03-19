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
    try {
        // upsert va chercher si UserId + date existent déjà
        await WeightEntry.upsert({
            weight: req.body.weight,
            date: req.body.date,
            UserId: req.session.userId
        });
        res.redirect('/weight');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'enregistrement");
    }
};