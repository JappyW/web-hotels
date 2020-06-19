import Router from "express";
import UploadImageController from "../controllers/UploadImageController";
import { ROOT_PROFILE_PATH, ROOT_COLLECTION_PATH } from "../constants/server.env.json";
import { upload, uploadCollection } from "../src/config/multerConfig";

const router = Router();

router.post(ROOT_COLLECTION_PATH, uploadCollection, UploadImageController.uploadCollection);
router.get(`${ROOT_COLLECTION_PATH}/:id`, UploadImageController.getCollectionByStudioId);
router.put(ROOT_PROFILE_PATH, upload, UploadImageController.uploadImage);
router.get(ROOT_PROFILE_PATH, UploadImageController.getImageByUrl);


export default router;
