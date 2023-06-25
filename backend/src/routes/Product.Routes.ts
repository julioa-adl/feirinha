import { Router } from 'express';
import ProductController from '../controllers/Product.Controller';

const productRouter = Router();
const productController = new ProductController();

productRouter
  .get('/', productController.getAll)
  .post('/', productController.create)
  .put('/', productController.update)
  .delete('/', productController.delete)

export default productRouter;