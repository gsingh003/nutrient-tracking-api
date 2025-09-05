const dotenv = require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Auth Routes", () => {
    let token;

    test("Register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            name: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    test("Login an existing user", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    test("Access protected route without token", async () => {
        const res = await request(app).get("/api/food-logs");

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe(
            "Unauthorized: Token missing or malformed"
        );
    });

    test("Access protected route with token", async () => {
        const res = await request(app)
            .get("/api/food-logs")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});
