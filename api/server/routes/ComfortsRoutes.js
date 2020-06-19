import Router from 'express';
import ComfortsController from '../controllers/ComfortsController';
import {COMFORTS} from '../constants/server.env.json';

const router = Router();

router.get(COMFORTS, ComfortsController.getAllComfortsbyStudioId);
router.delete(COMFORTS, ComfortsController.deleteComforts);
router.post(COMFORTS, ComfortsController.addComforts);


export default router;
