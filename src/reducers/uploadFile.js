import createReducer from "../lib/createReducer";
import { UPLOAD_ACTIONS,
   CLEAR_REDUX_FIELD,
    UPLOAD_COLLECTION_SUCCESS, 
    UPLOAD_COLLECTION_ERROR } from "../constants/actionTypes";
import { combineReducers } from "redux";

export default combineReducers({
  status: createReducer("init", {
    [CLEAR_REDUX_FIELD]: () => "init",
    [UPLOAD_ACTIONS.UPLOAD_FILES]: () => "pending",
    [UPLOAD_ACTIONS.UPLOAD_FILES_START]: () => "in progress",
    [UPLOAD_ACTIONS.UPLOAD_FILES_SUCCESS]: () => "done",
    [UPLOAD_ACTIONS.UPLOAD_FILES_FAILED]: () => "error"
  }),
  error: createReducer("", {
    [CLEAR_REDUX_FIELD]: () => "",
    [UPLOAD_ACTIONS.UPLOAD_FILES]: () => "",
    [UPLOAD_ACTIONS.UPLOAD_FILES_FAILED]: (state, action) =>
      action.payload.error
  }),
  progress: createReducer(0, {
    [UPLOAD_ACTIONS.UPLOAD_FILES]: () => 0,
    [UPLOAD_ACTIONS.UPLOAD_FILES_PROGRESS]: (state, action) =>
      action.payload.progress
  }),
  files: createReducer([], {
    [UPLOAD_ACTIONS.UPLOAD_FILES]: (state, action) => {
      return [action.payload.files].map(file => file);
    }
  }),
  collection: createReducer({
    collection_success : "",
    collection_error : ""
  }, {
    [UPLOAD_COLLECTION_SUCCESS]: () => {
      return {
        collection_success : "Hurray! Everything passed like it should...",
        collection_error : ""
      }
    },
    [UPLOAD_COLLECTION_ERROR]: () => {
      return {
        collection_success : "",
        collection_error : "Error! Something went wrong!"
      }
    },
    [CLEAR_REDUX_FIELD]: () => {
      return {
        collection_success : "",
        collection_error : ""
      }
    }
  })
});
