const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ email: req.body.email, password: hashedPassword });
        res.redirect('/login');
    } catch (e) { res.send("Erreur: Email déjà utilisé"); }
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user.id;
            return res.redirect('/dashboard');
        }
        res.send("Identifiants incorrects");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

router.get('/profile', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const user = await User.findByPk(req.session.userId);
    res.render('profile', { user });
});

router.post('/profile', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    await User.update(req.body, { where: { id: req.session.userId } });
    res.redirect('/profile');
});

module.exports = router;