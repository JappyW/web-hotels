import { put, takeEvery, call } from "redux-saga/effects";
import { uploadActionCreators } from "../actions/uploadActions";
import {
  UPLOAD_ACTIONS
} from "../constants/actionTypes";
import upload from "../api/uploadFileApi";

function createUploader(files, id) {
  const uploadPromise = upload(files, id);
  return [uploadPromise];
}

function* uploadFiles({ payload: { files, id } }) {
  yield put(uploadActionCreators.uploadFilesStart());
  try {
    const [uploadPromise] = yield call(createUploader, files, id);
    const res = yield call(() => uploadPromise);
    if (typeof files === "string") {
      yield put(uploadActionCreators.uploadFilesSuccess(res));
    }
    yield put(uploadActionCreators.uploadCollectionSuccess());
  } catch (res) {
    if (typeof files === "string") {
      yield put(uploadActionCreators.uploadFilesFailed(res.response.data));
    }
    yield put(uploadActionCreators.uploadCollectionError());
  }
}

export default function* uploadSaga() {
  yield takeEvery(UPLOAD_ACTIONS.UPLOAD_FILES, uploadFiles);
}
