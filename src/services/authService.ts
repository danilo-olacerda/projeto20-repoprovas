import * as authRepository from '../repositories/authRepository';
import * as userService from './userService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export async function register(email: string, password: string) {

    const user = await userService.getUserByEmail(email);

    if (user) {
        throw {type: 'conflict', message: 'E-mail already exists'};
    }

    const salt = 10;

    password = await bcrypt.hash(password, salt);

    await authRepository.register(email, password);

}

export async function login(email: string, password: string) {

    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw {type: 'unauthorized', message: 'Invalid email or password'};
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw {type: 'unauthorized', message: 'Invalid email or password'};
    }

    const SECRET = process.env.JWT_SECRET as string;
    const EXPIRES_IN = process.env.JWT_EXPIRES;

    const payload = {
        id: user.id,
        email: user.email,
    };

    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return {token: token};

}