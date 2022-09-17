import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { IUserData } from '../types/userTypes';

export async function register(req: Request, res: Response) {

    const { email, password }:IUserData = req.body;

    await authService.register(email, password);

    res.sendStatus(201);

}

export async function login(req: Request, res: Response) {

    const { email, password }:IUserData = req.body;

    const token = await authService.login(email, password);

    res.send(token);

}

