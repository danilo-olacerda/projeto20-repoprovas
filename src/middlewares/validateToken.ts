import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function validateToken(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('No authorization header found');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).send('Invalid authorization header');
    }

    const SECRET = process.env.JWT_SECRET as string;

    const user = jwt.verify(token, SECRET);

    res.locals.user = user;

    next();
}