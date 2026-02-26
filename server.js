require('dotenv').config();
const express = require('express');
const session = require('express-session');

// Import des routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const weightRoutes = require('./routes/weight');
const foodRoutes = require('./routes/food');
const analyticsRoutes = require('./routes/analytics');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Utilisation des routes
app.use(authRoutes);
app.use(profileRoutes);
app.use(weightRoutes);
app.use(foodRoutes);
app.use(analyticsRoutes);

app.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    next();
});

app.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/today');
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});