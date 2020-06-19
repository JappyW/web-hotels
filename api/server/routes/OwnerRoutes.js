import Router from "express";
import OwnerController from "../controllers/OwnerController";
import { OWNER_ID } from "../constants/server.env";
import { GET_STUDIOS_BY_OWNER_ID }  from '../constants/controller.env';

const router = Router();

router.get(`${OWNER_ID}`, OwnerController.validate(GET_STUDIOS_BY_OWNER_ID), OwnerController.getAllStudios);

export default router;