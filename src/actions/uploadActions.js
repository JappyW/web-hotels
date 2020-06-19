import {
  CLEAR_REDUX_FIELD,
  UPLOAD_ACTIONS,
  LOAD_FILE,
  RECEIVE_IMAGE_PROFILE,
  UPLOAD_COLLECTION_ERROR,
  UPLOAD_COLLECTION_SUCCESS
} from "../constants/actionTypes";

export const clearReduxField = { type: CLEAR_REDUX_FIELD };

export const receiveImageProfile = payload => ({
  type: RECEIVE_IMAGE_PROFILE,
  payload
});

export const onFileLoaded = payload => ({
  type: LOAD_FILE,
  payload
});


export const uploadActionCreators = {
  uploadFiles: (files, id) => {
    return {
      type: UPLOAD_ACTIONS.UPLOAD_FILES,
      payload: {
        files,
        id
      }
    };
  },

  uploadFilesStart: () => ({ type: UPLOAD_ACTIONS.UPLOAD_FILES_START }),

  uploadFilesSuccess: result => ({
    type: UPLOAD_ACTIONS.UPLOAD_FILES_SUCCESS,
    payload: {
      result
    }
  }),

  uploadFilesFailed: error => ({
    type: UPLOAD_ACTIONS.UPLOAD_FILES_FAILED,
    payload: {
      error
    },
    error: true
  }),

  uploadCollectionSuccess: () => ({ type: UPLOAD_COLLECTION_SUCCESS }),
  uploadCollectionError: () => ({ type: UPLOAD_COLLECTION_ERROR }),

};
