import StudioService from '../services/StudioService';
import { validateResponse, util } from "./ResponseWrapper";
import { validationResult, check } from 'express-validator';
import * as fieldValidator from '../validators/fieldValidator';
import * as STATUS from "../constants/status.code.env";
import * as VALIDATION  from '../constants/controller.env';
import { STUDIO_FIELDS } from '../constants/modelsFields';
import AddressController from './AddressController';
import AddressService from '../services/AddressService';
import MESSAGES from '../constants/messages.env.json';

const {
    STUDIOS_LIST: MESSAGE_STUDIOS_LIST,
    FOUND_STUDIO: MESSAGE_FOUND_STUDIO,
    STUDIO_ADDED: MESSAGE_STUDIO_ADDED,
    FOUND_FEEDBACK: MESSAGE_FOUND_FEEDBACK
} = MESSAGES.STUDIO_CONTROLLER;

class StudioController {
    static async getAllStudios(req, res) {
        try {
            const studios = await StudioService.getAllStudios(req.params.page);
            validateResponse(studios.length, studios, MESSAGE_STUDIOS_LIST);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static async getStudiobyId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const studio = await StudioService.getStudiobyId(req.params.id);
            validateResponse(!!studio, studio, MESSAGE_FOUND_STUDIO);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static async getFeedbackbyStudioId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const feedbackSearch = await StudioService.getFeedbackbyStudioId(req.query.id,req.query.page,req.query.star);
            validateResponse(!!feedbackSearch, feedbackSearch, MESSAGE_FOUND_FEEDBACK);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }



    static checkStudioFields() {
        return [
            ...AddressController.checkAddressFields(),
            ...fieldValidator.checkString(STUDIO_FIELDS.name, { min: 1, max: 70 }),
            ...fieldValidator.checkString(STUDIO_FIELDS.description, { min: 1, max: 1000 }),
            ...fieldValidator.checkInt(STUDIO_FIELDS.starRating, { gt: 0, lt: 6 }),
            ...fieldValidator.checkInt(STUDIO_FIELDS.ownerId, { gt: 0 }),
            check(STUDIO_FIELDS.ownerId).custom(fieldValidator.checkOwnerId)
        ];
    }

    static checkStudioId() {
        return [
            ...fieldValidator.checkIntInParams('id', { gt: 0 }),
        ];
    }

    static checkFeedbackByStudioId() {
        return [
            ...fieldValidator.checkInt('id', { gt: 0 }),
            ...fieldValidator.checkInt('page', { gt: 0 }),
        ];
    }

    static validate(method) {
        switch (method) {
            case VALIDATION.ADD_STUDIO: return this.checkStudioFields();
            case VALIDATION.GET_STUDIO_BY_ID: return this.checkStudioId();
            case VALIDATION.GET_FEEDBACK_BY_STUDIO_ID: return this.checkFeedbackByStudioId();
        }
    }

    static async addStudio(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const createdAddress = await AddressService.addAddress(req.body);
            req.body.addressId = createdAddress.dataValues.id;
            req.body.activated = false;
            const createdStudio = await StudioService.addStudio(req.body);
            util.setSuccess(STATUS.CREATED, MESSAGE_STUDIO_ADDED, createdStudio);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }
}

export default StudioController;
