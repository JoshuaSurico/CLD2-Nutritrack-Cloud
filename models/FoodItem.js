module.exports = (sequelize, DataTypes) => {
    const FoodItem = sequelize.define('FoodItem', {
        name: { type: DataTypes.STRING, allowNull: false },
        kcalPer100g: { type: DataTypes.FLOAT, allowNull: false },
        proteinPer100g: { type: DataTypes.FLOAT, defaultValue: 0 },
        carbsPer100g: { type: DataTypes.FLOAT, defaultValue: 0 },
        fatPer100g: { type: DataTypes.FLOAT, defaultValue: 0 }
    });
    return FoodItem;
};