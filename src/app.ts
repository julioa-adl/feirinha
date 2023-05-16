import express from 'express';
import userRouter from './routes/User.Routes';
import loginRouter from './routes/Login.Routes';

const app = express();
app.use(express.json());
app.use('/register', userRouter);
app.use('/login', loginRouter);

export default app;
