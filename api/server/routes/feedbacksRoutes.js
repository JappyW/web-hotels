import Router from 'express';
import FeedbacksController from '../controllers/FeedbacksController';

const router = Router();

router.get('/:id', FeedbacksController.getAllFeedbacksbyUserId);
router.post('/', FeedbacksController.addFeedback);

export default router;
