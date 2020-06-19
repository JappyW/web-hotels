import {
  RECEIVE_AUTH_SIGN_UP,
  RECEIVE_AUTH_SIGN_IN,
  RECEIVE_AUTH_SIGN_OUT,
  RECEIVE_USER_DATA,
  RECEIVE_SIGN_ERROR,
  RECEIVE_AUTH_CREDENTIALS,
  RECEIVE_PROFILE_ERROR,
  RECEIVE_PROFILE_CREDENTIALS,
  RECEIVE_PASSWORD_ERROR,
  RECEIVE_SEND_RECOVERY_ERROR,
  RECEIVE_PASSWORD_VALIDATE,
  RECEIVE_PASSWORD_RECOVER_VALIDATE,
  RECEIVE_CHANGE_PASSWORD
} from "../constants/authActionTypes";

const initialState = {
  isAuthenticated: false,
  token: "",
  errorMessage: ""
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_AUTH_SIGN_OUT:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        errorMessage: ""
      };
    case RECEIVE_USER_DATA:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_AUTH_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: ""
      };
    case RECEIVE_PROFILE_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_PASSWORD_VALIDATE:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_CHANGE_PASSWORD:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ""
      };
    case RECEIVE_PASSWORD_RECOVER_VALIDATE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: ""
      };
    case RECEIVE_PROFILE_ERROR:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: action.payload
      };
    case RECEIVE_PASSWORD_ERROR:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: action.payload
      };
    case RECEIVE_SIGN_ERROR:
      return { ...state, isAuthenticated: false, errorMessage: action.payload };
    case RECEIVE_SEND_RECOVERY_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}

export default authReducer;
