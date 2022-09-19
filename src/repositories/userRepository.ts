import prisma from '../db/db';

export async function getUserByEmail(email: string) {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    });
}

export async function getAllUserEmail(){
    return await prisma.users.findMany({
        select: {
            email: true
        }
    });
}