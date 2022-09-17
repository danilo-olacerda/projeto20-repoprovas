import prisma from '../db/db';

export async function register(email: string, password: string) {
    return await prisma.users.create({
        data: {
            email: email,
            password: password
        }
    });
}