const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite', logging: false });

const User = require('./User')(sequelize);
const WeightEntry = require('./WeightEntry')(sequelize);

User.hasMany(WeightEntry);
WeightEntry.belongsTo(User);

module.exports = { sequelize, User, WeightEntry };