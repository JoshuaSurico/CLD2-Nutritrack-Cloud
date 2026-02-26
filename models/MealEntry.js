module.exports = (sequelize, DataTypes) => {
    const MealEntry = sequelize.define('MealEntry', {
        mealType: { type: DataTypes.ENUM('Petit-déjeuner', 'Déjeuner', 'Dîner', 'Collation'), allowNull: false },
        foodName: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.FLOAT, allowNull: false },
        calories: { type: DataTypes.FLOAT },
        protein: { type: DataTypes.FLOAT },
        carbs: { type: DataTypes.FLOAT },
        fat: { type: DataTypes.FLOAT },
        date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
    });
    return MealEntry;
};