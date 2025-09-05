require("dotenv").config();
const sequelize = require("./config/database");
const { User, FoodLog } = require("./models");

(async () => {
    try {
        await sequelize.sync({ force: true }); // `force: true` drops tables if they exist
        console.log("Database synchronized successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error synchronizing the database:", error);
        process.exit(1);
    }
})();
