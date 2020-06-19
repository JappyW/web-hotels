import * as del from "del";
import fs from "fs-extra";
import MESSAGES from "../constants/messages.env.json";
import { regexps } from "../constants/regexpConstanst";

// function to encode file data to base64 encoded string
export const base64Encode = file => {
  const bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString("base64");
};

export const imageFilter = (req, file, cb) => {
  if (!file.mimetype.match(regexps.IMAGE_REGEXP)) {
    return cb(new Error(MESSAGES.GENERAL.ONLY_IMAGES), false);
  }
  cb(null, true);
};

export const imageExtensionsFromMimeType = (req, file, cb) => {
  const mimeType = file.mimetype;
  const extension = mimeType
    .match(regexps.END_OF_MIMETYPE)[0]
    .replace(/\//, ".");
  return extension;
};

export const replaceDoubleSlashes = str => {
  return str.replace(/\\/g, "/");
};

export const cleanFolder = function(folderPath) {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);
};
