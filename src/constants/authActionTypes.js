export const REQUEST_AUTH_SIGN_UP = "REQUEST_AUTH_SIGN_UP";
export const RECEIVE_AUTH_SIGN_UP = "RECEIVE_AUTH_SIGN_UP";
export const REQUEST_AUTH_SIGN_IN = "REQUEST_AUTH_SIGN_IN";
export const RECEIVE_AUTH_SIGN_IN = "RECEIVE_AUTH_SIGN_IN";
export const REQUEST_AUTH_SIGN_OUT = "REQUEST_AUTH_SIGN_OUT";
export const RECEIVE_AUTH_SIGN_OUT = "RECEIVE_AUTH_SIGN_OUT";
export const REQUEST_AUTH_GOOGLE = "REQUEST_AUTH_GOOGLE";
export const RECEIVE_AUTH_GOOGLE = "RECEIVE_AUTH_GOOGLE";
export const REQUEST_AUTH_FACEBOOK = "REQUEST_AUTH_FACEBOOK";
export const RECEIVE_AUTH_FACEBOOK = "RECEIVE_AUTH_FACEBOOK";
export const REQUEST_DASHBOARD_DATA = "REQUEST_DASHBOARD_DATA";
export const RECEIVE_DASHBOARD_DATA = "RECEIVE_DASHBOARD_DATA";
export const REQUEST_AUTH_CREDENTIALS = "REQUEST_AUTH_CREDENTIALS";
export const RECEIVE_AUTH_CREDENTIALS = "RECEIVE_AUTH_CREDENTIALS";
export const REQUEST_PROFILE_CREDENTIALS = "REQUEST_PROFILE_CREDENTIALS";
export const RECEIVE_PROFILE_CREDENTIALS = "RECEIVE_PROFILE_CREDENTIALS";
export const RECEIVE_PROFILE_ERROR = "RECEIVE_PROFILE_ERROR";
export const REQUEST_PASSWORD_VALIDATE = "REQUEST_PASSWORD_VALIDATE";
export const RECEIVE_PASSWORD_VALIDATE = "RECEIVE_PASSWORD_VALIDATE";
export const RECEIVE_PASSWORD_ERROR = "RECEIVE_PASSWORD_ERROR";
export const REQUEST_USER_DATA = "REQUEST_USER_DATA";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const REQUEST_AUTH_CHECK = "REQUEST_AUTH_CHECK";
export const RECEIVE_AUTH_CHECK = "RECEIVE_AUTH_CHECK";
export const REQUEST_AUTH_SIGNED_IN = "REQUEST_AUTH_SIGNED_IN";
export const REQUEST_EDIT_PROFILE = "REQUEST_EDIT_PROFILE";
export const RECEIVE_EDIT_PROFILE = "RECEIVE_EDIT_PROFILE";
export const RECEIVE_SIGN_ERROR = "RECEIVE_SIGN_ERROR";
export const REQUEST_VERIFY_USER = "REQUEST_VERIFY_USER";
export const RECEIVE_VERIFY_USER = "RECEIVE_VERIFY_USER";
export const REQUEST_VERIFICATION_EMAIL = "REQUEST_VERIFICATION_EMAIL";
export const RECEIVE_VERIFICATION_EMAIL = "RECEIVE_VERIFICATION_EMAIL";
export const REQUEST_CHANGE_PASSWORD = "REQUEST_CHANGE_PASSWORD";
export const RECEIVE_CHANGE_PASSWORD = "RECEIVE_CHANGE_PASSWORD";
export const REQUEST_SEND_RECOVERY = "REQUEST_SEND_RECOVERY";
export const RECEIVE_SEND_RECOVERY = "RECEIVE_SEND_RECOVERY";
export const RECEIVE_SEND_RECOVERY_ERROR = "RECEIVE_SEND_RECOVERY_ERROR";
export const REQUEST_PASSWORD_RECOVER = "REQUEST_PASSWORD_RECOVER";
export const RECEIVE_PASSWORD_RECOVER = "RECEIVE_PASSWORD_RECOVER";
export const REQUEST_PASSWORD_RECOVER_VALIDATE =
  "REQUEST_PASSWORD_RECOVER_VALIDATE";
export const RECEIVE_PASSWORD_RECOVER_VALIDATE =
  "RECEIVE_PASSWORD_RECOVER_VALIDATE";
export const RECEIVE_IMAGE_PROFILE = "RECEIVE_IMAGE_PROFILE";
export const REQUEST_GET_USER_PROFILE_URL = "REQUEST_GET_USER_PROFILE_URL";

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

export const GOOGLE_URL = "/oauth/google";
export const SIGN_IN = "/signin";
export const SIGN_UP = "/signup";
export const USERS_STATUS = "/status";
export const SIGN_OUT = "/signout";
export const EDIT_PROFILE = "/editprofile";
export const VERIFY = "/verify";
export const DECODE_USER_DATA = "/decodegiventoken";
export const SEND_EMAIL = "/sendemail";
export const CHANGE_PASSWORD = "/changepassword";
export const SEND_RECOVERY_EMAIL = "/sendrecoveryemail";
export const RECOVER_PASSWORD = "/recoverpassword";

export const JWT_TOKEN = "JWT_TOKEN";

export const UPLOAD_ACTIONS = {
  UPLOAD_FILES: "UPLOAD_FILES",
  UPLOAD_FILES_START: "UPLOAD_FILES_START",
  UPLOAD_FILES_PROGRESS: "UPLOAD_FILES_PROGRESS",
  UPLOAD_FILES_SUCCESS: "UPLOAD_FILES_SUCCESS",
  UPLOAD_FILES_FAILED: "UPLOAD_FILES_FAILED"
};
export const LOAD_FILE = "LOAD_FILE";


export const USERPROFILE = "Profile";
export const EDITPROFILE = "EditProfile";
export const CHANGEPASSWORD = "ChangePassword";
export const STUDIOMANAGEMENT = "StudioManagement";
export const LEAVEFEEDBACK = "LeaveFeedback";
export const INACTIVESTUDIOS = "InactiveStudios";
export const USERORDERS = "UserOrders";
export const ACTIVESTUDIOS = "ActiveStudios";
export const SUSPENDSTUDIOS = "SuspendStudios";
export const STUDIOS = "studios";

export const INVALIDEMAIL = "Email is invalid";
export const EMAILREQUIRED = "Email is required";
export const INVALID_PASSWORD =
  "Password should contain 4 symbols, at least one letter and one number";
export const PASSWORD_REQUIRED = "Password is required";
export const INVALIDNAME = "Name should have more than 2 symbols";
export const INVALIDSURNAME = "Surname should have more than 2 symbols";
export const INVALID_REAPEATED_PASSWORD =
  "Repeated password should contain 4 symbols, at least one letter and one number";
export const INVALID_NEW_PASSWORD =
  "New password should contain 4 symbols, at least one letter and one number";
export const PASSWORD_IS_TOO_SHORT = "Old password is required";
export const MINIMUM_NUMBER_OF_SYMBOLS_FOR_NAME = 2;
export const PRE_PASSWORD_CHANGE_ERROR = "Err"
export const NEW_PASSWORD = "newPassword";
export const REPEATED_NEW_PASSWORD = "repeatedNewPassword";
