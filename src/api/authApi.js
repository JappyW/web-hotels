import axios from "axios";
import {
  USERS,
  HOST,
  UPLOAD_PATH,
  UPLOAD_PROFILE_PATH
} from "../constants/actionTypes";
import {
  SIGN_IN,
  SIGN_UP,
  USERS_STATUS,
  SIGN_OUT,
  GOOGLE_URL,
  DECODE_USER_DATA,
  EDIT_PROFILE,
  VERIFY,
  SEND_EMAIL,
  CHANGE_PASSWORD,
  SEND_RECOVERY_EMAIL,
  RECOVER_PASSWORD
} from "../constants/authActionTypes";
const PATH = "path";

export const getProfile = async data => {
  if (data !== null) {
    const response = await axios.get(
      `${HOST}/${UPLOAD_PATH}/${UPLOAD_PROFILE_PATH}?${PATH}=${data}`
    );
    return response.data;
  }
};

export const getOAuthGoogle = async data => {
  const response = await axios.post(`${USERS}${GOOGLE_URL}`, {
    access_token: data
  });
  return response.data.data;
};

export const getSignIn = async data => {
  const response = await axios.post(`${USERS}${SIGN_IN}`, data);
  return response.data.data;
};

export const getSignUp = async data => {
  const response = await axios.post(`${USERS}${SIGN_UP}`, data);
  return response.data.data;
};

export const getCheckAuth = async () => {
  return await axios.get(`${USERS}${USERS_STATUS}`);
};

export const getSignOut = async () => {
  return await axios.get(`${USERS}${SIGN_OUT}`);
};

export const GetUserData = async email => {
  const response = await axios.post(`${USERS}${DECODE_USER_DATA}`, {
    email
  });
  return response.data.data.userData;
};

export const getEditProfile = async data => {
  const response = await axios.put(`${USERS}${EDIT_PROFILE}`, data);
  return response.data.data;
};

export const getChangePassword = async data => {
  const response = await axios.put(`${USERS}${CHANGE_PASSWORD}`, data);
  return response.data.data;
};

export const getVerifyUser = async data => {
  return await axios.post(`${USERS}${VERIFY}/${data.authToken}`, {
    user: data
  }).then(response => {
    return response.data
  })
  .catch(error => {
    return Promise.resolve(error.response.data)
 })
};

export const getVerificationEmail = async data => {
  const response = await axios.post(`${USERS}${SEND_EMAIL}`, {
    email: data
  });
  return response.data.data;
};

export const getSendRecoveryEmail = async data => {
  await axios.post(`${USERS}${SEND_RECOVERY_EMAIL}`, {
    email: data.email
  });
};

export const getRecoverPassword = async data => {
  await axios.put(`${USERS}${RECOVER_PASSWORD}`, {
    data
  });
};
