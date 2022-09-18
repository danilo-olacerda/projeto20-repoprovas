import supertest from "supertest";
import app  from "../../src/index";
import { prisma, userFactory, testFactory } from "./factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});


describe("testins the test rotes", () => {

    it("should create a new test", async () => {

        const user = await userFactory();

        await supertest(app).post("/register").send(user);

        delete user.confirmPassword;

        const login = await supertest(app).post("/login").send(user);

        const test = await testFactory();

        const response = await supertest(app).post("/tests/new").send(test).set("Authorization", `Bearer ${login.body.token}`);

        expect(response.status).toBe(201);

    });

    it("should not create a new test withoud token", async () => {

        const test = await testFactory();

        const response = await supertest(app).post("/tests/new").send(test).set("Authorization", `Bearer token`);

        expect(response.status).toBe(401);

    });

    it("should return the tests list sorted by terms > disciplines > tests ", async () => {

        const user = await userFactory();

        await supertest(app).post("/register").send(user);

        delete user.confirmPassword;

        const login = await supertest(app).post("/login").send(user);

        const response = await supertest(app).get("/tests/disciplines").send().set("Authorization", `Bearer ${login.body.token}`);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(6);
        expect(response.body[0].number).toBe(1);
        expect(response.body[0].disciplines).toHaveLength(2);
        expect(response.body[0].disciplines[0].name).toBe("HTML e CSS");
        expect(response.body[0].disciplines[0].teachersDisciplines[0]).toHaveProperty("tests");

    });

    it("should return the tests list sorted by teachers > categories > tests ", async () => {

        const user = await userFactory();

        await supertest(app).post("/register").send(user);

        delete user.confirmPassword;

        const login = await supertest(app).post("/login").send(user);

        const response = await supertest(app).get("/tests/teachers").send().set("Authorization", `Bearer ${login.body.token}`);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe("Diego Pinho");
        expect(response.body[0].teachersDisciplines).toHaveLength(3);
        expect(response.body[0].teachersDisciplines[0]).toHaveProperty("tests");
        expect(response.body[0].teachersDisciplines[0].discipline.name).toBe("HTML e CSS")

    });

    it("should not return the tests list sorted by teachers > categories > tests if invalid token", async () => {

        const response = await supertest(app).get("/tests/teachers").send().set("Authorization", `Bearer token`);

        expect(response.status).toBe(401);

    });
    
    it("should not return the tests list sorted by terms > disciplines > tests if invalid token", async () => {

        const response = await supertest(app).get("/tests/disciplines").send().set("Authorization", `Bearer token`);

        expect(response.status).toBe(401);

    });

});