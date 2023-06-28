import { Router } from 'express';
import MarketController from '../controllers/Market.Controller';
import mdws from '../middlewares/User.Middleware';

const marketRouter = Router();
const marketController = new MarketController();

marketRouter
  .get('/', marketController.getAll)
  .post('/', marketController.create)
  .put('/',mdws.validAdmin, marketController.update)
  .delete('/',mdws.validAdmin, marketController.delete);

export default marketRouter;
