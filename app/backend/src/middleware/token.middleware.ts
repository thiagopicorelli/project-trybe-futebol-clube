import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export function checkEmpty(str: string | undefined) {
  return str === undefined || str.length === 0;
}

export function checkTokenExists(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (checkEmpty(authorization)) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    next();
  }
}

export function checkTokenValid(req: Request, res: Response, next: NextFunction) {
  let { authorization } = req.headers;
  if (authorization === undefined) {
    authorization = '';
  }
  try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET as jwt.Secret);
    req.body.decoded = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}
