import ComfortsService from "../services/ComfortsService";
import { validateResponse, util } from "./ResponseWrapper";
import { validationResult, check } from 'express-validator';
const STATUS = require('../constants/status.code.env');
const COMFORTS_ADDED = 'COMFORTS_ADDED';
const FOUND_COMFORTS = 'FOUND_COMFORTS';
const COMFORT_DELETED = 'COMFORT_DELETED';

class ComfortsController {
    static async getAllComfortsbyStudioId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }

            const comforts = await ComfortsService.getAllComfortsbyStudioId(req.query.id);
            validateResponse(!!comforts, comforts, FOUND_COMFORTS);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static async addComforts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }

            const createdComfort = await ComfortsService.addComforts(req.body);
            util.setSuccess(STATUS.CREATED, COMFORTS_ADDED, createdComfort);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static async deleteComforts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const comforts = await ComfortsService.deleteComforts(req.query.room_id,req.query.comfort_id);
            validateResponse(!!comforts, comforts, COMFORT_DELETED);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }
}

export default ComfortsController;
