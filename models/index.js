const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Connexion à la base de données
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../db/database.sqlite'),
    logging: false
});

// Importation des modèles
const User = require('./User')(sequelize, DataTypes);
const WeightEntry = require('./WeightEntry')(sequelize, DataTypes);
const FoodItem = require('./FoodItem')(sequelize, DataTypes);
const MealEntry = require('./MealEntry')(sequelize, DataTypes);

// Définition des relations
User.hasMany(WeightEntry);
WeightEntry.belongsTo(User);

User.hasMany(MealEntry);
MealEntry.belongsTo(User);

// Export global
module.exports = { sequelize, User, WeightEntry, FoodItem, MealEntry };