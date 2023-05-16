import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import validateUserBody from '../middlewares/User.Middleware';

const userRouter = Router();
const userController = new UserController();

userRouter
  .post('/', validateUserBody, userController.create);

export default userRouter;
