import { Router } from 'express';
import UserController from '../controllers/User.Controller';

const loginRouter = Router();
const userController = new UserController();

loginRouter
  .post('/', userController.login);

export default loginRouter;
