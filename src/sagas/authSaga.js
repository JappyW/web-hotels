import { call, put, takeLeading, takeLatest } from "redux-saga/effects";
import {
  REQUEST_AUTH_GOOGLE,
  REQUEST_AUTH_SIGN_IN,
  REQUEST_AUTH_SIGN_UP,
  REQUEST_AUTH_CHECK,
  REQUEST_AUTH_SIGN_OUT,
  REQUEST_USER_DATA,
  REQUEST_DASHBOARD_DATA,
  REQUEST_EDIT_PROFILE,
  REQUEST_AUTH_SIGNED_IN,
  RECEIVE_SIGN_ERROR,
  REQUEST_VERIFY_USER,
  REQUEST_VERIFICATION_EMAIL,
  REQUEST_CHANGE_PASSWORD,
  REQUEST_PASSWORD_VALIDATE,
  RECEIVE_PASSWORD_ERROR,
  REQUEST_SEND_RECOVERY,
  RECEIVE_SEND_RECOVERY_ERROR,
  REQUEST_PASSWORD_RECOVER,
  JWT_TOKEN,
  PRE_PASSWORD_CHANGE_ERROR
} from "../constants/authActionTypes";

import {
  getOAuthGoogle,
  getSignIn,
  getSignUp,
  getCheckAuth,
  getSignOut,
  GetUserData,
  getEditProfile,
  getVerifyUser,
  getVerificationEmail,
  getChangePassword,
  getSendRecoveryEmail,
  getRecoverPassword,
  getProfile
} from "../api/authApi";
import {
  receiveOAuthGoogle,
  receiveSignIn,
  receiveGetDashboard,
  receiveDispatchAuthSignedIn,
  receiveSignOut,
  receiveSignUp,
  receiveGetEditProfile,
  receiveGetUserData,
  receiveVerificationEmail,
  receiveChangePassword,
  receiveValidationPassword,
  receiveSendRecoveryEmail,
  receiveRecoverPassword,
} from "../actions/authAction";
import { receiveImageProfile } from "../actions/uploadActions";
import { EMAIL_NOT_VERIFIED } from "../constants/actionTypes";

const WRONGCREDENTIALS = "Credentials arent right, try to use google instead";
const EMAILINUSE = "Email is already in use";
const EMAILWASNTFOUND = "Email wasnt found";
const PASSWORDS_DO_NOT_MATCH = "Passwords do not match";
const OLD_PASSWORD_IS_INVALID = "Old password is invalid";

function* workerGetOAuthGoogle(action) {
  try {
    const response = yield call(getOAuthGoogle, action.payload);
    yield put(receiveOAuthGoogle(response));
    localStorage.setItem(JWT_TOKEN, response.token);
    const res = yield call(GetUserData, response.userData.email);
    if (res.profileImage) {
      const responseImageProfile = yield call(getProfile, res.profileImage);
      if (responseImageProfile) {
        yield put(receiveImageProfile(responseImageProfile.data));
      }
    }
    yield put(receiveGetDashboard(res));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetOAuthGoogle() {
  yield takeLatest(REQUEST_AUTH_GOOGLE, workerGetOAuthGoogle);
}


function* workerGetSignIn(action) {
  try {
    const response = yield call(getSignIn, action.payload);
    yield put(receiveSignIn(response.token));
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveGetDashboard(response.userData));
    const responseWithImage = yield call(GetUserData, response.userData.email);
    if (responseWithImage.profileImage) {
      const responseImageProfile = yield call(
        getProfile,
        responseWithImage.profileImage
      );
      if (responseImageProfile) {
        yield put(receiveImageProfile(responseImageProfile.data));
      }
    }
  } catch (e) {
    yield put({ type: RECEIVE_SIGN_ERROR, payload: WRONGCREDENTIALS });
  }
}

export function* watcherGetSignIn() {
  yield takeLatest(REQUEST_AUTH_SIGN_IN, workerGetSignIn);
}

function* workerGetSignUp(action) {
  try {
    const response = yield call(getSignUp, action.payload);
    yield put(receiveSignUp(response.token));
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveGetDashboard(response.userData));
  } catch (e) {
    yield put({ type: RECEIVE_SIGN_ERROR, payload: EMAILINUSE });
  }
}

export function* watcherGetSignUp() {
  yield takeLatest(REQUEST_AUTH_SIGN_UP, workerGetSignUp);
}

function* workerGetCheckAuth() {
  try {
    yield call(getCheckAuth);
    yield put(receiveCheckAuth());
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetCheckAuth() {
  yield takeLatest(REQUEST_AUTH_CHECK, workerGetCheckAuth);
}

function* workerGetSignOut() {
  try {
    yield call(getSignOut);
    yield put(receiveSignOut());
    localStorage.removeItem(JWT_TOKEN);
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetSignOut() {
  yield takeLatest(REQUEST_AUTH_SIGN_OUT, workerGetSignOut);
}

function* workerGetValidationPassword(action) {
  try {
    const values = action.payload;
    if (values.newPassword != values.repeatedNewPassword) {
      yield put({
        type: RECEIVE_PASSWORD_ERROR,
        payload: PASSWORDS_DO_NOT_MATCH
      });
      return;
    }
    yield put(receiveValidationPassword());
    return;
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetValidationPassword() {
  yield takeLatest(REQUEST_PASSWORD_VALIDATE, workerGetValidationPassword);
}

function* workerDispatchAuthSignedIn() {
  try {
    const token = localStorage.getItem(JWT_TOKEN);
    yield put(receiveDispatchAuthSignedIn(token));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherDispatchAuthSignedIn() {
  yield takeLatest(REQUEST_AUTH_SIGNED_IN, workerDispatchAuthSignedIn);
}

export function* workerGetUserData() {
  try {
    const response = yield call(GetUserData, action.payload);
    yield put(receiveGetUserData(response));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetUserData() {
  yield takeLatest(REQUEST_USER_DATA, workerGetUserData);
}

export function* workerGetDashboard() {
  try {
    const token = localStorage.getItem(JWT_TOKEN);
    const user = parseJwt(token);
    const response = yield call(GetUserData, user.email);
    yield put(receiveGetDashboard(response));
    if (response.profileImage) {
      const responseImageProfile = yield call(
        getProfile,
        response.profileImage
      );
      if (responseImageProfile.data.length > 0) {
        yield put(receiveImageProfile(responseImageProfile.data));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetDashboard() {
  yield takeLatest(REQUEST_DASHBOARD_DATA, workerGetDashboard);
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function* workerGetChangePassword(action) {
  try {
    yield put ({
      type: RECEIVE_PASSWORD_ERROR,
      payload: PRE_PASSWORD_CHANGE_ERROR
    })
    const token = localStorage.getItem(JWT_TOKEN);
    const user = parseJwt(token);
    const response = yield call(getChangePassword, {
      email: user.email,
      payload: action.payload
    });
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveChangePassword(response.userData));
  } catch (e) {
    yield put({
      type: RECEIVE_PASSWORD_ERROR,
      payload: OLD_PASSWORD_IS_INVALID
    });
  }
}

export function* watcherGetChangePassword() {
  yield takeLatest(REQUEST_CHANGE_PASSWORD, workerGetChangePassword);
}

export function* workerGetEditProfile(action) {
  try {
    const token = localStorage.getItem(JWT_TOKEN);
    const user = parseJwt(token);
    const userData = yield call(GetUserData, user.email);
    userData.fullname = action.payload.name + " " + action.payload.surname;
    const response = yield call(getEditProfile, userData);
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveGetEditProfile(response.userData));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetEditProfile() {
  yield takeLatest(REQUEST_EDIT_PROFILE, workerGetEditProfile);
}

export function* workerVerifyUser(action) {
  try {
    const token = localStorage.getItem(JWT_TOKEN);
    const user = parseJwt(token);
    const userData = yield call(GetUserData, user.email);
    const verifyResponse = yield call(getVerifyUser, {
      email: userData.email,
      authToken: action.payload
    });
    if (verifyResponse.status == OK_STATUS) {
      yield put(receiveGetDashboard(verifyResponse.data.userData));
      localStorage.setItem(JWT_TOKEN, verifyResponse.data.token);
    } else {
      yield({
        type: RECEIVE_SIGN_ERROR,
        payload: EMAIL_NOT_VERIFIED
      })
    }
  } catch (e) {
    console.error(e);
  }
}

export function* watcherVerifyUser() {
  yield takeLatest(REQUEST_VERIFY_USER, workerVerifyUser);
}

export function* workerGetVerificationEmail(action) {
  try {
    const response = yield call(getVerificationEmail, action.payload);
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveVerificationEmail(response.userData));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetVerificationEmail() {
  yield takeLatest(REQUEST_VERIFICATION_EMAIL, workerGetVerificationEmail);
}

export function* workerGetSendRecoveryEmail(action) {
  try {
    yield call(getSendRecoveryEmail, action.payload);
    yield put(receiveSendRecoveryEmail());
  } catch (e) {
    yield put({ type: RECEIVE_SEND_RECOVERY_ERROR, payload: EMAILWASNTFOUND });
    console.error(e);
  }
}

export function* watcherGetSendRecoveryEmail() {
  yield takeLatest(REQUEST_SEND_RECOVERY, workerGetSendRecoveryEmail);
}

export function* workerRecoverPassword(action) {
  try {
    yield call(getRecoverPassword, action.payload);
    yield put(receiveRecoverPassword());
    const response = yield call(getSignIn, {
      email: action.payload.email,
      password: action.payload.password
    });
    yield put(receiveSignIn(response.token));
    localStorage.setItem(JWT_TOKEN, response.token);
    yield put(receiveGetDashboard(response.userData));
    
    const responseWithImage = yield call(GetUserData, response.userData.email);
    if (responseWithImage.profileImage) {
      const responseImageProfile = yield call(
        getProfile,
        responseWithImage.profileImage
      );
      if (responseImageProfile) {
        yield put(receiveImageProfile(responseImageProfile.data));
      }
    }

  } catch (e) {
    console.error(e);
  }
}

export function* watcherRecoverPassword() {
  yield takeLatest(REQUEST_PASSWORD_RECOVER, workerRecoverPassword);
}
