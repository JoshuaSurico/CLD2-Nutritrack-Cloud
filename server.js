require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { sequelize } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(require('./routes/auth'));
app.use(require('./routes/weight'));

app.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});

app.get('/', (req, res) => res.redirect('/login'));

sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
});