import { Router } from 'express';
import MarketingController from '../controllers/Marketing.Controller';

const marketingRouter = Router();
const marketingController = new MarketingController();

marketingRouter
  .post('/', marketingController.create)
  .delete('/', marketingController.delete);

export default marketingRouter;
