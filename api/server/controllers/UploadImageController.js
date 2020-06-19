import { util } from "./ResponseWrapper";
import * as STATUS from "../constants/status.code.env.json";
import * as MESSAGES from "../constants/messages.env.json";
import ImageUploadService from "../services/ImageUploadService";
import { replaceDoubleSlashes } from "../utils/uploadUtils";
import fs from "fs-extra";
import path from "path";
import base64Img from "base64-img";
import { UPLOAD_COLLECTION_PATH } from "../constants/server.env.json";

const SUCCESS_MESSAGE = "Profile Image Added!";

class UploadImageController {
  static async uploadImage(req, res) {
    const recievedfile = req.file;
    fs.readdir(recievedfile.destination, (err, files) => {
      if (err) {
        console.log(err);
      }

      files.forEach(file => {
        const fileDir = path.join(recievedfile.destination, file);

        if (file !== recievedfile.filename) {
          fs.unlinkSync(fileDir);
        }
      });
    });

    const newImageProfile = Object.assign({}, req.body, req.file);
    try {
      const createdImageProfile = await ImageUploadService.addImageProfile(
        newImageProfile
      );
      util.setSuccess(STATUS.SUCCESS, SUCCESS_MESSAGE, createdImageProfile[0]);

      const fileToConvert = replaceDoubleSlashes(`${req.file.path}`);
      const convertedFile = base64Img.base64Sync(fileToConvert);
      res.send(convertedFile);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async uploadCollection(req, res) {
    const path = req.files[0].destination;
    const thisSessionFiles = fs
      .readdirSync(path)
      .filter(file => (file.includes(req.body.sessionId)))

    try {
      const createdImageCollection = await ImageUploadService.addImageCollection(
        thisSessionFiles, req.body.studioId
      );
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, createdImageCollection);
      return util.send(res);
    } catch (e) {
      throw e;
    }
  }

  static async getImageByUrl(req, res) {
    const imageUrl = req.query;
    try {
      const path = imageUrl.path;
      const convFile = base64Img.base64Sync(path);
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, convFile);
      return util.send(res);
    } catch (error) {
      util.setError(STATUS.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async getCollectionByStudioId(req, res) {
    const studioId = req.params.id;
    try {
      const collectionArray = await ImageUploadService.getCollectionByStudioId(studioId);
      const collectionBase64 = collectionArray.map(image => {
        const fileToConvert = `${UPLOAD_COLLECTION_PATH}/studio-${studioId}-folder/${image.photo_url}`;
        return base64Img.base64Sync(fileToConvert);
      })
      util.setSuccess(STATUS.SUCCESS, MESSAGES.UTILS.SUCCESS, collectionBase64);
      return util.send(res);
    } catch (e) {
      util.setError(STATUS.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }
}

export default UploadImageController;
