import { Router } from 'express';
import FeirinhaController from '../controllers/Feirinha.Controller';

const feirinhaRouter = Router();
const feirinhaController = new FeirinhaController();

feirinhaRouter
  .get('/', feirinhaController.getAll)
  .post('/', feirinhaController.create)

export default feirinhaRouter;