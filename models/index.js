const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

let sequelize;

// SI on est sur Render (Postgres)
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} 
// SINON on est en local (SQLite)
else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../db/database.sqlite'),
        logging: false
    });
}

const User = require('./User')(sequelize, DataTypes);
const WeightEntry = require('./WeightEntry')(sequelize, DataTypes);
const FoodItem = require('./FoodItem')(sequelize, DataTypes);
const MealEntry = require('./MealEntry')(sequelize, DataTypes);

User.hasMany(WeightEntry);
WeightEntry.belongsTo(User);
User.hasMany(MealEntry);
MealEntry.belongsTo(User);

module.exports = { sequelize, User, WeightEntry, FoodItem, MealEntry };