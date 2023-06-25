/* eslint-disable max-len */

const userInput = {
  'name': 'example',
  'email': 'example@example.com',
  'password': '123456',
  'birthday': '01-01-2000',
  'role': 'User'
}

const userOutPut = {
  id: 'a1b2c3d4e5f6g7h8i9',
  name: 'example',
  email: 'example@example.com',
  password: '123456',
  birthday: '01-01-2000',
  role: 'User'
};

const mockPayload = {
  'data': {
    'name': 'example',
    'email': 'example@example.com',
    'password': '',
    'birthday': '01-01-2000',
    'role': 'User',
    '_id': '64962b595f70d057c5800a62',
    '__v': 0
  },
  'iat': 1687563097,
  'exp': 1688167897
}

const mockPayloadSuper = {
  'data': {
    '_id': '6493bca1072835a98f7d23fa',
    'name': 'Super',
    'email': 'julioader@gmail.com',
    'password': '',
    'birthday': '11-12-1994',
    'role': 'Super',
    '__v': 0
  },
  'iat': 1687564642,
  'exp': 1688169442
}

const tokenSuperMock = {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0OTNiY2ExMDcyODM1YTk4ZjdkMjNmYSIsIm5hbWUiOiJTdXBlciIsImVtYWlsIjoianVsaW9hZGVyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIiwiYmlydGhkYXkiOiIxMS0xMi0xOTk0Iiwicm9sZSI6IlN1cGVyIiwiX192IjowfSwiaWF0IjoxNjg3NTY5NDE5LCJleHAiOjE2ODgxNzQyMTl9.cfoRSfsyv9aTTYlLMenbgK9_u9XKPxCz1tdtN_A-hgk'
}

const tokenUserMock = {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJleGFtcGxlIiwiZW1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIiLCJiaXJ0aGRheSI6IjAxLTAxLTIwMDAiLCJyb2xlIjoiVXNlciIsIl9pZCI6IjY0OTYyYjU5NWY3MGQwNTdjNTgwMGE2MiIsIl9fdiI6MH0sImlhdCI6MTY4NzU2MzA5NywiZXhwIjoxNjg4MTY3ODk3fQ.N7jZNWTQmNUFSP_oEGR37yw-Y5lUdE3bnXVwf46Ayso'
}

const noPasswordLoginBody = { email: userOutPut.email, password: '' };
const noEmailLoginBody = { email: '', password: userOutPut.password };


export {
  userInput,
  userOutPut,
  noPasswordLoginBody,
  noEmailLoginBody,
  mockPayload,
  mockPayloadSuper,
  tokenSuperMock,
  tokenUserMock,
}