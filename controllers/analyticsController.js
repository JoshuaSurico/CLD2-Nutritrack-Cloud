const { WeightEntry, MealEntry } = require('../models');

exports.getAnalytics = async (req, res) => {
    const weights = await WeightEntry.findAll({
        where: { UserId: req.session.userId },
        order: [['date', 'ASC']]
    });

    const meals = await MealEntry.findAll({
        where: { UserId: req.session.userId },
        order: [['date', 'ASC']]
    });

    const nutritionByDate = {};
    meals.forEach(m => {
        if (!nutritionByDate[m.date]) {
            nutritionByDate[m.date] = { date: m.date, kcal: 0, p: 0, g: 0, l: 0 };
        }
        nutritionByDate[m.date].kcal += m.calories;
        nutritionByDate[m.date].p += m.protein;
        nutritionByDate[m.date].g += m.carbs;
        nutritionByDate[m.date].l += m.fat;
    });

    const nutritionData = Object.values(nutritionByDate);

    res.render('analytics', { 
        weightData: JSON.stringify(weights), 
        nutritionData: JSON.stringify(nutritionData) 
    });
};