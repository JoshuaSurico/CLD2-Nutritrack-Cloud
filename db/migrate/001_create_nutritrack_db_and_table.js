// db/migrate/001_create_nutritrack_db_and_table.js
const { sequelize } = require('../../models');

async function migrate() {
    try {
        console.log("🚀 Starting Migration...");
        // sync({ alter: true }) updates existing tables with new columns 
        // without deleting data
        await sequelize.sync({ alter: true });
        console.log("✅ Database tables created/updated successfully.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}

migrate();