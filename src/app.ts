import express from 'express';
import userRouter from './routes/User.Routes';
import loginRouter from './routes/Login.Routes';
import marketingRouter from './routes/Marketing.Routes';
import productRouter from './routes/Product.Routes';

const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/marketing', marketingRouter)
app.use('/product', productRouter)

export default app;
