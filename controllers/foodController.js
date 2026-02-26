const { MealEntry, FoodItem, User } = require('../models');
const { Op } = require('sequelize');

exports.getToday = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const entries = await MealEntry.findAll({ where: { UserId: req.session.userId, date: today } });
    const user = await User.findByPk(req.session.userId);

    const totals = entries.reduce((acc, curr) => {
        acc.kcal += curr.calories;
        acc.p += curr.protein;
        acc.g += curr.carbs;
        acc.l += curr.fat;
        return acc;
    }, { kcal: 0, p: 0, g: 0, l: 0 });

    res.render('today', { entries, totals, user });
};

exports.getAddFood = async (req, res) => {
    const allFoods = await FoodItem.findAll({ 
        order: [['name', 'ASC']] 
    });
    
    res.render('add-food', { allFoods });
};

exports.postAddFood = async (req, res) => {
    let { foodId, customName, calories, protein, carbs, fat, quantity, mealType } = req.body;
    const today = new Date().toISOString().split('T')[0];

    let finalEntry = { UserId: req.session.userId, mealType, quantity, date: today };

    if (foodId) { 
        const food = await FoodItem.findByPk(foodId);
        const ratio = quantity / 100;
        finalEntry.foodName = food.name;
        finalEntry.calories = food.kcalPer100g * ratio;
        finalEntry.protein = food.proteinPer100g * ratio;
        finalEntry.carbs = food.carbsPer100g * ratio;
        finalEntry.fat = food.fatPer100g * ratio;
    } else {
        finalEntry.foodName = customName;
        finalEntry.calories = parseFloat(calories) || 0;
        finalEntry.protein = parseFloat(protein) || 0;
        finalEntry.carbs = parseFloat(carbs) || 0;
        finalEntry.fat = parseFloat(fat) || 0;
    }

    await MealEntry.create(finalEntry);
    res.redirect('/today');
};