const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FoodLog = sequelize.define(
    "FoodLog",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        foodName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: DataTypes.INTEGER,
        protein: DataTypes.FLOAT,
        carbs: DataTypes.FLOAT,
        fats: DataTypes.FLOAT,
        vitamins: DataTypes.JSON, // Store vitamins and minerals as key-value pairs
    },
    {
        timestamps: true,
    }
);

module.exports = FoodLog;
