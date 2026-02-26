// db/run-seeds.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const seedFolder = path.join(__dirname, 'seed');

const files = fs.readdirSync(seedFolder)
    .filter(file => file.endsWith('.js'))
    .sort();

console.log("🌱 Lancement de tous les seeds...");

try {
    for (const file of files) {
        console.log(`\n▶️ Exécution de : ${file}`);
        execSync(`node ${path.join(seedFolder, file)}`, { stdio: 'inherit' });
    }
    console.log("\n✅ Tous les seeds ont été exécutés avec succès !");
} catch (error) {
    console.error("\n❌ Un seed a échoué. Arrêt du processus.");
    process.exit(1);
}