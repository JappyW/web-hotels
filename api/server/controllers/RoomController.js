import RoomService from '../services/RoomService';
import { validateResponse, util } from "./ResponseWrapper";
import { validationResult } from 'express-validator';
import { ROOM_FIELDS } from '../constants/modelsFields';
import * as fieldValidator from '../validators/fieldValidator';
import * as STATUS from '../constants/status.code.env';
import * as VALIDATION from '../constants/controller.env';
import MESSAGES from '../constants/messages.env.json';

const { 
    ROOM_ADDED: MESSAGE_ROOM_ADDED,
    ROOMS_LIST: MESSAGE_ROOMS_LIST
} = MESSAGES.ROOM_CONTROLLER;

class RoomController {
    static async getAllRooms(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                
                throw (errors.mapped());
            }
            const rooms = await RoomService.getAllRooms(req.query.studioId);
            validateResponse(rooms.length, rooms, MESSAGE_ROOMS_LIST);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }

    static checkRoomFields() {
        return [
            ...fieldValidator.checkInt(ROOM_FIELDS.studioId, { gt: 0 }),
            ...fieldValidator.checkInt(ROOM_FIELDS.roomTypeId, { gt: 0 }),
            ...fieldValidator.checkInt(ROOM_FIELDS.price, { gt: 0 }),
            ...fieldValidator.checkInt(ROOM_FIELDS.roomNumber, { gt: 0 })
        ];
    }

    static checkStudioId() {
        return [
            ...fieldValidator.checkInt(ROOM_FIELDS.studioId, { gt: 0 }),
        ];
    }

    static validate(method) {
        switch (method) {
            case VALIDATION.ADD_ROOM: return this.checkRoomFields();
            case VALIDATION.GET_ROOMS_BY_STUDIO_ID: return this.checkStudioId();
        }
    }

    static async addRoom(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw (errors.mapped());
            }
            const createdRoom = await RoomService.addRoom(req.body);
            util.setSuccess(STATUS.CREATED, MESSAGE_ROOM_ADDED, createdRoom);
            return util.send(res);
        } catch (error) {
            util.setError(STATUS.BAD_REQUEST, error);
            return util.send(res);
        }
    }
}

export default RoomController;