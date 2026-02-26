const { User, WeightEntry, MealEntry } = require('../../models');
const bcrypt = require('bcryptjs');

async function seedHistory() {
    try {
        console.log("⏳ Génération de 90 jours d'historique en cours...");

        // 1. Créer un utilisateur de test (ou le récupérer s'il existe)
        let user = await User.findOne({ where: { email: 'demo@test.com' } });
        if (!user) {
            const hashedPassword = await bcrypt.hash('password', 10);
            user = await User.create({ 
                email: 'demo@test.com', 
                password: hashedPassword,
                calorieGoal: 2200 
            });
        }

        const userId = user.id;

        // 2. Nettoyer les anciennes données de cet utilisateur (pour éviter les doublons si on relance le script)
        await WeightEntry.destroy({ where: { UserId: userId } });
        await MealEntry.destroy({ where: { UserId: userId } });

        // 3. Générer 90 jours de données (Boucle allant de -90 jours à aujourd'hui)
        for (let i = 90; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];

            // Poids : Commence à 85kg et descend doucement avec des petites variations
            const baseWeight = 85 - ((90 - i) * 0.05); // Perd environ 4.5kg en 90 jours
            const randomFluctuation = (Math.random() * 0.8) - 0.4; // +/- 400g par jour
            
            await WeightEntry.create({ 
                UserId: userId, 
                date: dateString, 
                weight: parseFloat((baseWeight + randomFluctuation).toFixed(1)) 
            });

            // Repas : Un gros "repas consolidé" aléatoire par jour
            await MealEntry.create({
                UserId: userId,
                date: dateString,
                mealType: 'Déjeuner',
                foodName: 'Journée complète (Test)',
                quantity: 1,
                // Calories entre 1800 et 2400
                calories: Math.floor(1800 + Math.random() * 600),
                protein: Math.floor(100 + Math.random() * 40),
                carbs: Math.floor(200 + Math.random() * 60),
                fat: Math.floor(60 + Math.random() * 25)
            });
        }

        console.log("✅ Faux historique généré avec succès !");
        console.log("👉 Connecte-toi avec :");
        console.log("Email : demo@test.com");
        console.log("Mot de passe : password");
        process.exit(0);
        
    } catch (error) {
        console.error("❌ Erreur :", error);
        process.exit(1);
    }
}

seedHistory();