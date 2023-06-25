import { Router } from 'express';
import UserController from '../controllers/User.Controller';
import mdws from '../middlewares/User.Middleware';

const userRouter = Router();
const userController = new UserController();

userRouter
  .get('/', userController.getUsers)
  .post('/', mdws.validateRegister, userController.create)
  .put('/', mdws.validateToken, mdws.validateUserUpdate, userController.update)
  .delete('/', mdws.validateToken, mdws.validateUserUpdate,userController.delete);

export default userRouter;
