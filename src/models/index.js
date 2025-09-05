const User = require("./User");
const FoodLog = require("./FoodLog");

User.hasMany(FoodLog, { foreignKey: "userId", as: "foodLogs" });
FoodLog.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
    User,
    FoodLog,
};
