import multer from "multer";
import fs from "fs-extra";
import { UPLOAD_PROFILE_PATH, UPLOAD_COLLECTION_PATH } from "../../constants/server.env.json";
import { MAX_SIZE_UPLOAD } from "../../constants/config.env.json";
import {
  imageFilter,
  imageExtensionsFromMimeType
} from "../../utils/uploadUtils";
const MAX_FILE_IN_COLLECTION_SIZE = 1 * 1024 *1024;
const FORM_NAME_PROFILE = "profile";
const FORM_NAME_COLLECTION = "collection";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = `user-${req.body.userId}-folder`;
    fs.mkdirsSync(`${UPLOAD_PROFILE_PATH}/${userFolder}`);
    cb(null, `${UPLOAD_PROFILE_PATH}/${userFolder}`);
  },
  filename: (req, file, cb) => {
    const ext = imageExtensionsFromMimeType(req, file, cb);
    cb(null, `${file.originalname}${ext}`);
  }
});
const storageCollection = multer.diskStorage({
  destination: (req, file, cb) => {
    const collectionFolder = `studio-${req.body.studioId}-folder`;
    fs.mkdirsSync(`${UPLOAD_COLLECTION_PATH}/${collectionFolder}`);
    cb(null, `${UPLOAD_COLLECTION_PATH}/${collectionFolder}`);
  },
  filename: (req, file, cb) => {
    const ext = imageExtensionsFromMimeType(req, file, cb);
    cb(null, `${Date.now()}-${req.body.sessionId}-${file.originalname}${ext}`);
  }
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: eval(MAX_SIZE_UPLOAD) },
  fileFilter: imageFilter
}).single(FORM_NAME_PROFILE);

export const uploadCollection = multer({
  storage: storageCollection,
  limits: { fileSize: eval(MAX_FILE_IN_COLLECTION_SIZE) },
  fileFilter: imageFilter
}).array(FORM_NAME_COLLECTION)
