import Router from "express";
import userRoutes from "./UserRoutes";
import studioRoutes from "./StudioRoutes";
import addressRoutes from "./AddressRoutes";
import orderRoutes from "./OrderRoutes";
import searchRoutes from "./SearchRoutes";
import adminRoutes from "./AdminRoutes";
import ownerRoutes from "./OwnerRoutes";
import uploadImageRoutes from "./UploadImageRoutes";
import feedbacksRoutes from "./feedbacksRoutes";
import comfortsRoutes from "./ComfortsRoutes";
import roomRoutes from "./RoomRoutes";

import {
  API_URL,
  USERS,
  STUDIOS,
  ADDRESSES,
  ADMIN,
  OWNER,
  ORDERS,
  SEARCH,
  UPLOAD_IMAGE,
  FEEDBACKS,
  STUDIOS_COMFORTS,
  STUDIOS_FEEDBACK,
  ROOMS
} from "../constants/server.env";

const router = Router();
const USERS_URL = API_URL + USERS;
const STUDIOS_URL = API_URL + STUDIOS;
const ADDRESSES_URL = API_URL + ADDRESSES;
const ORDERS_URL = API_URL + ORDERS;
const SEARCH_URL = API_URL + SEARCH;
const ADMIN_URL = API_URL + ADMIN;
const UPLOAD_IMAGE_URL = API_URL + UPLOAD_IMAGE;
const FEEDBACKS_URL = API_URL + FEEDBACKS;
const OWNER_URL = API_URL + OWNER;
const STUDIOS_FEEDBACK_URL = API_URL + STUDIOS_FEEDBACK;
const ROOMS_URL = API_URL + ROOMS;

router.use(USERS_URL, userRoutes);
router.use(STUDIOS_URL, studioRoutes);
router.use(ADDRESSES_URL, addressRoutes);
router.use(ORDERS_URL, orderRoutes);
router.use(SEARCH_URL, searchRoutes);
router.use(ADMIN_URL, adminRoutes);
router.use(OWNER_URL, ownerRoutes);
router.use(UPLOAD_IMAGE_URL, uploadImageRoutes);
router.use(FEEDBACKS_URL, feedbacksRoutes);
router.use(STUDIOS_FEEDBACK_URL, studioRoutes);
router.use(STUDIOS_URL, comfortsRoutes);
router.use(ROOMS_URL, roomRoutes);

export default router;
