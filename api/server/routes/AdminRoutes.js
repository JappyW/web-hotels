import Router from "express";
import AdminController from "../controllers/AdminController";
import { STUDIO, STUDIOS, ID, STATUS, INACTIVE, ACTIVE, SUSPEND, FORM, EMAIL, COUNT, OWNER } from "../constants/server.env";

const router = Router();

router.get(`${STUDIOS}${INACTIVE}`, AdminController.getListNotActiveStudios);
router.put(`${STATUS}${STUDIO}${ID}`, AdminController.statusStudios);
router.get(`${STUDIOS}${ACTIVE}`, AdminController.getListActiveStudios);
router.post(`${FORM}${EMAIL}`, AdminController.sendEmailToOwner);
router.get(`${STUDIOS}${SUSPEND}`, AdminController.getListSuspendStudios);
router.get(`${STUDIOS}${INACTIVE}${COUNT}`, AdminController.getCauntInactiveStudios);


export default router;