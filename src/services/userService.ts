import * as userRepository from '../repositories/userRepository';

export async function getUserByEmail(email: string) {

    return await userRepository.getUserByEmail(email);

}

export async function getAllUserEmail() {

    return await userRepository.getAllUserEmail();

}