const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createFoodLog,
    getUserFoodLogs,
} = require("../controllers/foodLogController");

const router = express.Router();

router.post("/", authMiddleware, createFoodLog);

router.get("/", authMiddleware, getUserFoodLogs);

module.exports = router;
