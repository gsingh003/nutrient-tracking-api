const { FoodLog } = require("../models");

exports.createFoodLog = async (req, res) => {
    try {
        const { foodName, calories, protein, carbs, fats, vitamins } = req.body;

        const foodLog = await FoodLog.create({
            userId: req.user.id,
            foodName,
            calories,
            protein,
            carbs,
            fats,
            vitamins, // vitamins and minerals in JSON format
        });

        res.status(201).json({
            message: "Food log created successfully",
            foodLog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUserFoodLogs = async (req, res) => {
    try {
        const foodLogs = await FoodLog.findAll({
            where: { userId: req.user.id },
        });

        res.status(200).json({ foodLogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
