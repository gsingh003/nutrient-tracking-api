const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getSummary } = require("../controllers/summaryController");

const router = express.Router();

// Get summary for a specific date range (protected route)
// example request: GET /api/summaries?startDate=2024-11-01&endDate=2024-11-30
// example 2: GET /api/summaries?range=daily  <- or weekly, monthly instead
router.get("/", authMiddleware, getSummary);

module.exports = router;
