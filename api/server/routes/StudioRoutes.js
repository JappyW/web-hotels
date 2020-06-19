import Router from 'express';
import StudioController from '../controllers/StudioController';
import * as VALIDATION  from '../constants/controller.env';
import {ID, PAGE, PARAM_PAGE, SEARCH} from '../constants/server.env.json';

const router = Router();

router.get(SEARCH,StudioController.validate(VALIDATION.GET_FEEDBACK_BY_STUDIO_ID), StudioController.getFeedbackbyStudioId);
router.get(`${PAGE}${PARAM_PAGE}`, StudioController.getAllStudios)
router.post('/', StudioController.validate(VALIDATION.ADD_STUDIO), StudioController.addStudio);
router.get(ID, StudioController.validate(VALIDATION.GET_STUDIO_BY_ID), StudioController.getStudiobyId);

export default router;

