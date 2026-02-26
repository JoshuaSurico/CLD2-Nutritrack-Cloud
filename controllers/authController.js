const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.getRegister = (req, res) => res.render('register');

exports.postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ email: req.body.email, password: hashedPassword });
        res.redirect('/login');
    } catch (e) {
        res.send("Erreur: Email déjà utilisé");
    }
};

exports.getLogin = (req, res) => res.render('login');

exports.postLogin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            req.session.userId = user.id;
            return res.redirect('/today');
        }
        res.send("Identifiants incorrects");
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};