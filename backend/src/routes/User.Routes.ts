import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import { validateToken } from '../middlewares/User.Middleware';

const userRouter = Router();
const userController = new UserController();

userRouter
  .get('/', userController.getUsers)
  .post('/', userController.create)
  .put('/', userController.update)
  .delete('/', userController.delete);

export default userRouter;
