import Util from "../utils/Utils";
export const util = new Util();
const MESSAGES = require("../constants/messages.env");
const STATUS = require("../constants/status.code.env");

export const validateResponse = (criteria, data, message) => {
  if (criteria) {
    util.setSuccess(STATUS.SUCCESS, message, data);
  } else {
    util.setSuccess(STATUS.NO_CONTENT, MESSAGES.GENERAL.NO_CONTENT);
  }
};
export const validateResponseError = (criteria, data, okayMessage, notFoundMessage) => {
  if (criteria) {
    util.setSuccess(STATUS.SUCCESS, okayMessage, data);
  } else {
    util.setSuccess(STATUS.NO_CONTENT, notFoundMessage);
  }
};

