import jwt = require('jsonwebtoken');

export function createValidToken(secret: jwt.Secret) {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  return jwt.sign(
    { data: { email:'user@user.com', password:'secret_user' } },
    secret as jwt.Secret,
    jwtConfig as jwt.SignOptions,
  );
  
}