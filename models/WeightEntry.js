module.exports = (sequelize, DataTypes) => {
    const WeightEntry = sequelize.define('WeightEntry', {
        weight: { type: DataTypes.FLOAT, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false }
    });
    return WeightEntry;
};