const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('User', {
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        height: { type: DataTypes.FLOAT, allowNull: true },
        calorieGoal: { type: DataTypes.INTEGER, defaultValue: 2000 },
        proteinGoal: { type: DataTypes.INTEGER, defaultValue: 150 },
        carbGoal: { type: DataTypes.INTEGER, defaultValue: 250 },
        fatGoal: { type: DataTypes.INTEGER, defaultValue: 70 }
    });
};