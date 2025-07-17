import jwt from 'jsonwebtoken';

const SECRET = 'secretkey123';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};