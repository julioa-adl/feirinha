import { Router } from 'express';
import ProductController from '../controllers/Product.Controller';
import mdwsProd from '../middlewares/Product.Middleware';
import mdwsUser from '../middlewares/User.Middleware';

const productRouter = Router();
const productController = new ProductController();

productRouter
  .get('/', productController.getAll)
  .post('/',mdwsProd.validCreateProd, productController.create)
  .put('/', productController.update)
  .delete('/', mdwsUser.validAdmin, productController.delete)

export default productRouter;