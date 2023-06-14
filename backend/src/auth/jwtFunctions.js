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

//admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1taW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIiLCJiaXJ0aGRheSI6IjExLTEyLTE5OTQiLCJyb2xlIjoiQWRtaW4iLCJfaWQiOiI2NDg4ZTk5ZTA1NTFjMzM2ZjRjOGYxZGIiLCJfX3YiOjB9LCJpYXQiOjE2ODY2OTQzMDIsImV4cCI6MTY4NzI5OTEwMn0.XrguMaVqkDV4PXU6F2MerUez8you20LumxKp7q3T6i4

//user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBdWd1c3RvIFNhbnRvcyIsImVtYWlsIjoiYWd1c3RvQG1heGltby5jb20uYnIiLCJwYXNzd29yZCI6IiIsImJpcnRoZGF5IjoiMTAtMTAtMTk4NSIsInJvbGUiOiJVc2VyIiwiX2lkIjoiNjQ4OWU1ZmQzNzU1YjU5MzQ0MTdiNjEyIiwiX192IjowfSwiaWF0IjoxNjg2NzU4OTA5LCJleHAiOjE2ODczNjM3MDl9.QiVpntYuIMl6hMUfCOjE_vWPfARFn-Rh2uunsCDv4Zg