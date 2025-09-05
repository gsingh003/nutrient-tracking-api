const { FoodLog } = require("../models");
const { Op } = require("sequelize");

const calculateTotals = (foodLogs) => {
    const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        vitamins: {},
    };

    foodLogs.forEach((log) => {
        totals.calories += log.calories || 0;
        totals.protein += log.protein || 0;
        totals.carbs += log.carbs || 0;
        totals.fats += log.fats || 0;

        // accumulate vitamins
        const vitamins = log.vitamins || {};
        for (const [key, value] of Object.entries(vitamins)) {
            totals.vitamins[key] = (totals.vitamins[key] || 0) + value;
        }
    });

    return totals;
};

const getRange = (range) => {
    const now = new Date();
    let startDate, endDate;

    switch (range) {
        case "daily":
            startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);
            break;
        case "weekly":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7);
            break;
        case "monthly":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;
        default:
            throw new Error("Invalid range");
    }

    return { startDate, endDate };
};

exports.getSummary = async (req, res) => {
    try {
        const { range } = req.query;

        let startDate, endDate;
        if (range) {
            ({ startDate, endDate } = getRange(range));
        } else {
            ({ startDate, endDate } = req.query);
            if (!startDate || !endDate) {
                return res
                    .status(400)
                    .json({ message: "startDate and endDate are required" });
            }
        }

        const foodLogs = await FoodLog.findAll({
            where: {
                userId: req.user.id,
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });

        const totals = calculateTotals(foodLogs);

        res.status(200).json({ totals, count: foodLogs.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
