// db/run-migrations.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const migrateFolder = path.join(__dirname, 'migrate');

// 1. Lire le dossier, filtrer uniquement les .js, et les trier par ordre alphabétique
const files = fs.readdirSync(migrateFolder)
    .filter(file => file.endsWith('.js'))
    .sort(); 

console.log("🚀 Lancement de toutes les migrations...");

// 2. Exécuter chaque fichier un par un
try {
    for (const file of files) {
        console.log(`\n▶️ Exécution de : ${file}`);
        // stdio: 'inherit' permet de voir les console.log du fichier enfant dans ton terminal actuel
        execSync(`node ${path.join(migrateFolder, file)}`, { stdio: 'inherit' });
    }
    console.log("\n✅ Toutes les migrations ont été exécutées avec succès !");
} catch (error) {
    console.error("\n❌ Une migration a échoué. Arrêt du processus.");
    process.exit(1);
}