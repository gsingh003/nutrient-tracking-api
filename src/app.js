const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const logger = require("./utils/logger");
const helmet = require("helmet");
const foodLogRoutes = require("./routes/foodLogRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

// register global middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/food-logs", foodLogRoutes);
app.use("/api/summaries", summaryRoutes);

// global error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err,
    });
});

module.exports = app;
