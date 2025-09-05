const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false, // Disable logging for production
    }
);

const shutdown = async () => {
    console.log("Shutting down gracefully...");
    try {
        await sequelize.close();
        console.log("Database connection closed.");
    } catch (err) {
        console.error("Error closing database connection:", err);
    }
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = sequelize;
