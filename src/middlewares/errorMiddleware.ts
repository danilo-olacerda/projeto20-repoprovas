import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type || err.name) {
    return res.status(errorTypeToStatusCode(err.type || err.name)).send(err.message);
  } 

  return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
  if (errorType === 'conflict') return 409;
  if (errorType === 'notFound') return 404;
  if (errorType === 'unauthorized') return 401;
  if (errorType === 'JsonWebTokenError') return 401;

  return 400;
}