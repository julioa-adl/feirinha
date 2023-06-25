import { Router } from 'express';
import MarketController from '../controllers/Market.Controller';

const marketRouter = Router();
const marketController = new MarketController();

marketRouter
  .post('/', marketController.create)
  .delete('/', marketController.delete);

export default marketRouter;
