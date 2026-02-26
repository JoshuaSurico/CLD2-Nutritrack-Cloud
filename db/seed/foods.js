const { FoodItem } = require('../../models');

async function seed() {
    try {
        console.log("🌱 Seeding database...");
        
const foods =[
            // --- VIANDES & POISSONS ---
            { name: 'Poulet (filet)', kcalPer100g: 165, proteinPer100g: 31, carbsPer100g: 0, fatPer100g: 3.6 },
            { name: 'Boeuf haché (5% MG)', kcalPer100g: 125, proteinPer100g: 21, carbsPer100g: 0, fatPer100g: 5 },
            { name: 'Saumon cuit', kcalPer100g: 206, proteinPer100g: 22, carbsPer100g: 0, fatPer100g: 13 },
            { name: 'Thon en boîte (nature)', kcalPer100g: 110, proteinPer100g: 24, carbsPer100g: 0, fatPer100g: 1 },
            
            // --- FÉCULENTS & CÉRÉALES ---
            { name: 'Riz blanc cuit', kcalPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28, fatPer100g: 0.3 },
            { name: 'Pâtes cuites', kcalPer100g: 157, proteinPer100g: 5.8, carbsPer100g: 30, fatPer100g: 0.9 },
            { name: 'Flocons d\'avoine', kcalPer100g: 370, proteinPer100g: 13, carbsPer100g: 60, fatPer100g: 7 },
            { name: 'Pain de mie complet', kcalPer100g: 250, proteinPer100g: 10, carbsPer100g: 43, fatPer100g: 3 },
            { name: 'Quinoa cuit', kcalPer100g: 120, proteinPer100g: 4.4, carbsPer100g: 21, fatPer100g: 1.9 },
            { name: 'Patate douce cuite', kcalPer100g: 86, proteinPer100g: 1.6, carbsPer100g: 20, fatPer100g: 0.1 },

            // --- LÉGUMINEUSES & VÉGÉTARIEN ---
            { name: 'Lentilles cuites', kcalPer100g: 116, proteinPer100g: 9, carbsPer100g: 20, fatPer100g: 0.4 },
            { name: 'Pois chiches en boîte', kcalPer100g: 139, proteinPer100g: 7, carbsPer100g: 23, fatPer100g: 2 },
            { name: 'Tofu nature', kcalPer100g: 76, proteinPer100g: 8, carbsPer100g: 2, fatPer100g: 4 },

            // --- OEUFS & PRODUITS LAITIERS ---
            { name: 'Oeuf entier', kcalPer100g: 155, proteinPer100g: 13, carbsPer100g: 1.1, fatPer100g: 11 },
            { name: 'Skyr', kcalPer100g: 63, proteinPer100g: 11, carbsPer100g: 4, fatPer100g: 0.2 },
            { name: 'Fromage blanc 0%', kcalPer100g: 48, proteinPer100g: 8, carbsPer100g: 4, fatPer100g: 0 },
            { name: 'Lait demi-écrémé', kcalPer100g: 47, proteinPer100g: 3.3, carbsPer100g: 4.8, fatPer100g: 1.5 },
            { name: 'Emmental', kcalPer100g: 370, proteinPer100g: 28, carbsPer100g: 0, fatPer100g: 29 },

            // --- FRUITS & LÉGUMES ---
            { name: 'Pomme', kcalPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14, fatPer100g: 0.2 },
            { name: 'Banane', kcalPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23, fatPer100g: 0.3 },
            { name: 'Brocoli cuit', kcalPer100g: 35, proteinPer100g: 2.4, carbsPer100g: 7, fatPer100g: 0.4 },
            { name: 'Tomate', kcalPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2 },

            // --- LIPIDES & SNACKS ---
            { name: 'Avocat', kcalPer100g: 160, proteinPer100g: 2, carbsPer100g: 9, fatPer100g: 15 },
            { name: 'Amandes', kcalPer100g: 579, proteinPer100g: 21, carbsPer100g: 22, fatPer100g: 50 },
            { name: 'Beurre de cacahuète', kcalPer100g: 588, proteinPer100g: 25, carbsPer100g: 20, fatPer100g: 50 },
            { name: 'Huile d\'olive', kcalPer100g: 884, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100 },
            { name: 'Chocolat noir 70%', kcalPer100g: 598, proteinPer100g: 8, carbsPer100g: 34, fatPer100g: 43 }
        ];

        // This prevents duplicates if you run the script twice
        for (const food of foods) {
            await FoodItem.findOrCreate({
                where: { name: food.name },
                defaults: food
            });
        }

        console.log("✅ Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();