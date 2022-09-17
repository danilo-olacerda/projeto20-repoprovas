import * as userRepository from '../repositories/userRepository';

export async function getUserByEmail(email: string) {

    return await userRepository.getUserByEmail(email);

}