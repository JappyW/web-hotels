import { call, put, takeEvery } from "redux-saga/effects";
import {
  getUserOrders,
  getUserFeedbacks,
  postFeedback
} from "../api/feedbacksApi";
import { exportfeedbacksActions } from "../constants";
import {
  receiveUserOrders,
  receiveUserFeedbacks
} from "../actions/feedbacksAction";

function* workerGetUserOrders(action) {
  try {
    const response = yield call(getUserOrders, action.payload);
    yield put(receiveUserOrders(response));
  } catch (e) {
    console.error(e);
  }
}

function* workerGetUserFeedbacks(action) {
  try {
    const response = yield call(getUserFeedbacks, action.payload);
    yield put(receiveUserFeedbacks(response));
  } catch (e) {
    console.error(e);
  }
}

function* workerAddUserFeedback(action) {
  try {
    yield call(postFeedback, action.payload);
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetUserOrders() {
  yield takeEvery(
    exportfeedbacksActions.REQUEST_USER_ORDERS,
    workerGetUserOrders
  );
}

export function* watcherGetUserFeedbacks() {
  yield takeEvery(
    exportfeedbacksActions.REQUEST_USER_FEEDBACKS,
    workerGetUserFeedbacks
  );
}

export function* watcherAddUserFeedback() {
  yield takeEvery(
    exportfeedbacksActions.REQUEST_POST_USER_FEEDBACK,
    workerAddUserFeedback
  );
}
