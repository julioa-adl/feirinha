import express from 'express';
import userRouter from './routes/User.Routes';
import loginRouter from './routes/Login.Routes';
import marketingRouter from './routes/Marketing.Routes';
import productRouter from './routes/Product.Routes';
import feirinhaRouter from './routes/Feirinha.Routes';

const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/market', marketingRouter);
app.use('/product', productRouter);
app.use('/feirinha', feirinhaRouter);

export default app;
