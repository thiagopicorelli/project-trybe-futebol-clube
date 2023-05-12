import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import * as User from '../services/user.service';

function checkEmpty(str: string | undefined) {
  return str === undefined || str.length === 0;
}

export function checkFieldsFilled(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (checkEmpty(email) || checkEmpty(password)) {
    res.status(400).json({ message: 'All fields must be filled' });
  } else {
    next();
  }
}

const invalidMessage = 'Invalid email or password';

export function checkFieldsValid(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (emailRegex.test(email) && password.length >= 6) {
    next();
  } else {
    res.status(401).json({ message: invalidMessage });
  }
}

export async function checkEmailInDatabase(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const database = await User.find(email);
  if (database !== null) {
    req.body.hash = database.password;
    next();
  } else {
    res.status(401).json({ message: invalidMessage });
  }
}

export function checkPasswordInDatabase(req: Request, res: Response, next: NextFunction) {
  const { password, hash } = req.body;
  if (bcrypt.compareSync(password, hash)) {
    next();
  } else {
    res.status(401).json({ message: invalidMessage });
  }
}

export function getToken(req: Request, res: Response) {
  const { email, password } = req.body;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(
    { data: { email, password } },
    secret as jwt.Secret,
    jwtConfig as jwt.SignOptions,
  );

  res.status(200).json({ token });
}
//role
export function checkTokenExist(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (checkEmpty(authorization)) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    next();
  }
}