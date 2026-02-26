const { User } = require('../models');

exports.getProfile = async (req, res) => {
    const user = await User.findByPk(req.session.userId);
    res.render('profile', { user });
};

exports.postProfile = async (req, res) => {
    await User.update(req.body, { where: { id: req.session.userId } });
    res.redirect('/profile');
};