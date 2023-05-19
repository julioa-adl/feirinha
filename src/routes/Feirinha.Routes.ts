import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';

const feirinhaRouter = Router();
const feirinhaController = new FeirinhaController();

feirinhaRouter
  .post('/', feirinhaController.create)

export default feirinhaRouter;