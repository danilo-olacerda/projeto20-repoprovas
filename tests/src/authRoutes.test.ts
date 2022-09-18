import supertest from "supertest";
import app  from "../../src/index";
import { prisma, userFactory } from "./factories/userFactory";

describe("testins the auth rotes", () => {

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users;`;
        await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    });
    
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should create a new user", async () => {

        const user = await userFactory();

        const response = await supertest(app).post("/register").send(user);

        expect(response.status).toBe(201);

    });

    it("should return error 409 while using same email", async () => {
            
        const user = await userFactory();

        const userCreated = await supertest(app).post("/register").send(user);

        if (userCreated.status === 201) {
            const response = await supertest(app).post("/register").send(user);
            expect(response.status).toBe(409);
        }

    });

    it("should return the token when correctly login", async () => {
            
        const user = await userFactory();

        await supertest(app).post("/register").send(user);

        delete user.confirmPassword;

        const response = await supertest(app).post("/login").send(user);

        expect(response.body).toHaveProperty("token");
    
    });

    it("should not return token with wrog credentials", async () => {
            
        const user = await userFactory();

        await supertest(app).post("/register").send(user);

        delete user.confirmPassword;

        user.password = "wrong password";

        const response = await supertest(app).post("/login").send(user);

        expect(response.status).toBe(401);
    
    });

});