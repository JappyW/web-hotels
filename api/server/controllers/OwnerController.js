import OwnerService from '../services/OwnerService';
import { validateResponse, util } from "./ResponseWrapper";
import { validationResult } from 'express-validator';
import { STUDIO_FIELDS } from '../constants/modelsFields';
import * as fieldValidator from '../validators/fieldValidator';
import * as STATUS from '../constants/status.code.env';
import { GET_STUDIOS_BY_OWNER_ID }  from '../constants/controller.env';
import MESSAGES from '../constants/messages.env.json';

const { STUDIOS_LIST: MESSAGE_STUDIOS_LIST } = MESSAGES.STUDIO_CONTROLLER;

class OwnerController {
    static async getAllStudios(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const studios = await OwnerService.getAllStudios(req.params.ownerId);
            validateResponse(studios.length, studios, MESSAGE_STUDIOS_LIST);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static checkOwnerId() {
        return [
            ...fieldValidator.checkIntInParams(STUDIO_FIELDS.ownerId, { gt: 0 }),
        ];
    }

    static validate(method) {
        switch (method) {
            case GET_STUDIOS_BY_OWNER_ID: return this.checkOwnerId();
        }
    }
}

export default OwnerController;