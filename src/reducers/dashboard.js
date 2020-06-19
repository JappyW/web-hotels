import {
  RECEIVE_DASHBOARD_DATA,
  RECEIVE_EDIT_PROFILE,
  RECEIVE_CHANGE_PASSWORD,
  RECEIVE_AUTH_SIGN_OUT
} from "../constants/authActionTypes";

import {
  UPLOAD_ACTIONS,
  LOAD_FILE,
  RECEIVE_IMAGE_PROFILE,
  CLEAR_REDUX_FIELD,
  RECEIVE_GET_COUNT_INACTIVE_STUDIOS,
  SET_SONG
} from "../constants/actionTypes";

const initialState = {
  user: null,
  authType: "",
  image: "",
  imageFile: null,
  countInactiveStudios: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DASHBOARD_DATA:
      return {
        ...state,
        user: action.payload,
        authType: action.payload.authType,
        imageFile: null
      };
    case RECEIVE_EDIT_PROFILE:
      return {
        ...state,
        user: action.payload,
        authType: action.payload.authType
      };
    case RECEIVE_IMAGE_PROFILE:
      return {
        ...state,
        image: action.payload
      };
    case RECEIVE_AUTH_SIGN_OUT:
      return {
        ...initialState
      };
    case RECEIVE_CHANGE_PASSWORD:
      return {
        ...state,
        user: action.payload,
        authType: action.payload.authType
      };
    case LOAD_FILE:
      return {
        ...state,
        imageFile: action.payload
      };
    case UPLOAD_ACTIONS.UPLOAD_FILES_SUCCESS:
      return {
        ...state,
        image: action.payload.result.data
      };
    case CLEAR_REDUX_FIELD:
      return {
        ...state,
        imageFile: null
      };
    case RECEIVE_GET_COUNT_INACTIVE_STUDIOS:
      return {
        ...state,
        countInactiveStudios: action.payload.countInactiveStudios
      };
      case SET_SONG:
        return {
          ...state,
          song: action.payload
        };
    default:
      return state;
  }
};
