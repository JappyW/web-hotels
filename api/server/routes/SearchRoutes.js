import Router from 'express';
import SearchController from '../controllers/SearchController';

const router = Router();

router.post('/', SearchController.getStudiosbySearchCriteria);
router.get('/tips', SearchController.getSearchTips);

export default router;
