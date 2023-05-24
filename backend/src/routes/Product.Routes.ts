import { Router } from 'express';
import ProductController from '../controllers/Product.Controller';

const productRouter = Router();
const productController = new ProductController();

productRouter
  .post('/', productController.create)
  .put('/', productController.update)

export default productRouter;