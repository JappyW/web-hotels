import Router from "express";
import RoomController from "../controllers/RoomController";
import { 
    GET_ROOMS_BY_STUDIO_ID,
    ADD_ROOM
} from '../constants/controller.env';

const router = Router();

router.get('/', RoomController.validate(GET_ROOMS_BY_STUDIO_ID), RoomController.getAllRooms);
router.post('/', RoomController.validate(ADD_ROOM), RoomController.addRoom);

export default router;