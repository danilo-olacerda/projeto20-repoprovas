import { faker } from '@faker-js/faker';
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
export default prisma;

async function userFactory() {

    const user: {email: string, password: string, confirmPassword?: string} = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    user.confirmPassword = user.password;

    return user;
}

async function testFactory() {

    const test = {
        name: 'test',
        pdfUrl: 'www.test.com',
        categoryId: 1,
        teacherDisciplineId: 1
    }

    return test;

}

export { prisma, userFactory, testFactory };