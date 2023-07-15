import { Router } from 'express';
import RecommendationController from '../controllers/Recommendation.Controller';
import mdwsUser from '../middlewares/User.Middleware';

const recommendationRouter = Router();
const recommendationController = new RecommendationController();

recommendationRouter
  .get('/', recommendationController.getAll)
  .post('/', recommendationController.create)
  .delete('/', mdwsUser.validAdmin, recommendationController.delete)

export default recommendationRouter;