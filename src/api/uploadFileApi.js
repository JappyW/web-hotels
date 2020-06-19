import axios from "axios";
import uniqid from "uniqid";
import {
  HOST,
  UPLOAD_PATH,
  UPLOAD_PROFILE_PATH,
  UPLOAD_COLLECTION_PATH
} from "../constants/actionTypes";
import { convertDataURLToFile } from "../helpers";

const USER_ID = "userId";
const FORM_NAME = "profile";
const uploadedFilename = "Sended_file";

const STUDIO_ID = "studioId";
const SESSION_ID = "sessionId";
const DROPZONE_FORM_NAME = "collection";


export default (files, id) => {
  const data = new FormData();
  const sessionId = uniqid();
  if (typeof files === "string") {
    const convertedFiles = convertDataURLToFile(files, uploadedFilename);
    [convertedFiles].map(file => {
      data.append(USER_ID, id);
      data.append(FORM_NAME, file);
      return data;
    });
    return axios.put(`${HOST}/${UPLOAD_PATH}/${UPLOAD_PROFILE_PATH}`, data);
  };

  data.append(STUDIO_ID, id);
  data.append(SESSION_ID, sessionId);

  [...files].map(file => {
    data.append(DROPZONE_FORM_NAME, file);
    return data;
  });

  return axios.post(`${HOST}/${UPLOAD_PATH}/${UPLOAD_COLLECTION_PATH}`, data);

};
