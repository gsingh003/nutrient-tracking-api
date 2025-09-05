const dotenv = require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const { getUserIdFromToken } = require("../utils/jwt");

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Food Log Routes", () => {
    let token;

    beforeAll(async () => {
        const userRes = await request(app).post("/api/auth/register").send({
            name: "testuser",
            email: "test2@example.com",
            password: "password123",
        });

        token = userRes.body.token;
        userId = getUserIdFromToken(token);
    });

    test("Add a food log", async () => {
        const res = await request(app)
            .post("/api/food-logs")
            .set("Authorization", `Bearer ${token}`)
            .send({
                userId,
                foodName: "Apple",
                calories: 95,
                protein: 0.5,
                carbs: 25,
                fats: 0.3,
                vitamins: { "Vitamin C": 8.4 },
            });

        expect(res.statusCode).toBe(201);
    });

    test("Get all food logs for a user", async () => {
        const res = await request(app)
            .get("/api/food-logs")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});
