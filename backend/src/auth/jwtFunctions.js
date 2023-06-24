import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const keyPath = path.join(__dirname, '..', '../jwt.evaluation.key');
const secret = fs.readFileSync(keyPath, 'utf8');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload.data;
  } catch (erro) {
    return { isError: true, erro };
  }
};

export { createToken, verifyToken };
