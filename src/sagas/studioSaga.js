import { call, put, takeEvery } from "redux-saga/effects";
import { REQUEST_CURRENT_PAGE, LOADING } from "../constants/actionTypes";
import { getStudios } from "../api/studioApi";
import { receiveCurrentPage } from "../actions/studioAction";
import { browserHistory } from "react-router";

export function* workerGetStudios(action) {
  try {
    const response = yield call(getStudios, action.payload);
    const currentPageDetails = {
      studios: response[0].studiosList,
      currentPage: action.payload,
      pageCount: response[0].pageCount
    };

    yield put(receiveCurrentPage(currentPageDetails));

    yield browserHistory.push(`/home/page/${action.payload}`);

    yield put({ type: LOADING });
    
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetStudios() {
  yield takeEvery(REQUEST_CURRENT_PAGE, workerGetStudios);
}
