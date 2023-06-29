import { Router } from 'express';
import MarketController from '../controllers/Market.Controller';
import mdws from '../middlewares/User.Middleware';
import mktMiddleware from '../middlewares/Market.Middleware';

const marketRouter = Router();
const marketController = new MarketController();

marketRouter
  .get('/', marketController.getAll)
  .post('/', mktMiddleware.validCreateMarket, marketController.create)
  .put('/',mdws.validAdmin, marketController.update)
  .delete('/',mdws.validAdmin, marketController.delete);

export default marketRouter;
