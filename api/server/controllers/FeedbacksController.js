import FeedbacksService from '../services/FeedbacksService';
import { validateResponse, util } from "./ResponseWrapper";
import { validationResult, check } from 'express-validator';
const STATUS = require('../constants/status.code.env');
const FOUND_FEEDBACKS = 'FOUND_FEEDBACKS';
const FEEDBACK_ADDED = 'FEEDBACK_ADDED';

class FeedbacksController {
       static async getAllFeedbacksbyUserId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const feedbacks = await FeedbacksService.getAllFeedbacksbyUserId(req.params.id);
            validateResponse(!!feedbacks, feedbacks, FOUND_FEEDBACKS);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static async addFeedback(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const createdFeedback = await FeedbacksService.addFeedback(req.body);
            util.setSuccess(STATUS.CREATED, FEEDBACK_ADDED, createdFeedback);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

}

export default FeedbacksController;
