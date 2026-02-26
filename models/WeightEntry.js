const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('WeightEntry', {
        weight: { type: DataTypes.FLOAT, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false }
    });
};