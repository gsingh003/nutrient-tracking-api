const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }
};

const getUserIdFromToken = (token) => {
    try {
        const decoded = verifyToken(token); // Use verifyToken to decode the token
        return decoded.userId; // Extract userId from the decoded payload
    } catch (error) {
        throw new Error("Unable to extract userId from token");
    }
};

module.exports = { generateToken, verifyToken, getUserIdFromToken };
