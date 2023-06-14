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

//super eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0OGEzNDFhYTdmNzU2ZmNjOTdjNjA0MCIsIm5hbWUiOiJTdXBlciIsImVtYWlsIjoianVsaW9hZGVyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIiwiYmlydGhkYXkiOiIxMS0xMi0xOTk0Iiwicm9sZSI6IlN1cGVyIiwiX192IjowfSwiaWF0IjoxNjg2NzgwNzkyLCJleHAiOjE2ODczODU1OTJ9.jKLmraDLCOtvedF9j5gQ_nM4tZ07VD-8rQJTS8tHgdc

//user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBdWd1c3RvIFNhbnRvcyIsImVtYWlsIjoiYWd1c3RvQG1heGltby5jb20uYnIiLCJwYXNzd29yZCI6IiIsImJpcnRoZGF5IjoiMTAtMTAtMTk4NSIsInJvbGUiOiJVc2VyIiwiX2lkIjoiNjQ4OWU1ZmQzNzU1YjU5MzQ0MTdiNjEyIiwiX192IjowfSwiaWF0IjoxNjg2NzU4OTA5LCJleHAiOjE2ODczNjM3MDl9.QiVpntYuIMl6hMUfCOjE_vWPfARFn-Rh2uunsCDv4Zg