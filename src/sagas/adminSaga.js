import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  RECEIVE_GET_INACTIVE_STUDIOS,
  REQUEST_GET_INACTIVE_STUDIOS,
  RECEIVE_UPDATE_STATUS_STUDIO,
  REQUEST_UPDATE_STATUS_STUDIO,
  RECEIVE_GET_LIST_ACTIVE_STUDIOS,
  REQUEST_GET_LIST_ACTIVE_STUDIOS,
  RECEIVE_SEND_OWNER_MESSAGE,
  REQUEST_SEND_OWNER_MESSAGE,
  REQUEST_GET_COUNT_INACTIVE_STUDIOS,
  RECEIVE_GET_COUNT_INACTIVE_STUDIOS,
  RECEIVE_GET_LIST_SUSPEND_STUDIOS,
  REQUEST_GET_LIST_SUSPEND_STUDIOS,
  LOADING
} from "../constants/actionTypes";
import {
  getInactiveStudios,
  updateStatusStudio,
  getListActiveHolels,
  sendOwnerMessage,
  getCountInactiveStudios,
  getListSuspendHolels
} from "../api/adminApi";

const getAdminState = state => state.adminReducer;
const getAdminForm = state => state.form["sendOwnerMessage"];

function* workerGetInactiveStudios(action) {
  try {
    const response = yield call(getInactiveStudios);
    yield put({ type: RECEIVE_GET_INACTIVE_STUDIOS, payload: response });
    yield put({ type: LOADING });

  } catch (e) {
    console.error(e);
  }
};

function* workerUpdateStatusStudio(action) {
  try {
    const adminState = yield select(getAdminState);

    yield call(updateStatusStudio, action.payload);
    yield put({
      type: RECEIVE_UPDATE_STATUS_STUDIO,
      payload: {
        studios: adminState.notActiveStudios,
        activateStudioId: action.payload.id
      }
    });
  } catch (e) {
    console.error(e);
  }
};

function* workerGetListActiveStudios(acton) {
  try {
    const response = yield call(getListActiveHolels);

    yield put({ type: RECEIVE_GET_LIST_ACTIVE_STUDIOS, payload: response });
    yield put({ type: LOADING });

  } catch (e) {
    console.error(e);
  }
};

function* workerSendOwnerMessage(action) {
  try {
    const state = yield select(getAdminState);
    const adminForm = yield select(getAdminForm);
    const response = yield call(sendOwnerMessage, action.payload);
    yield put({ type: RECEIVE_SEND_OWNER_MESSAGE, payload: response });
  } catch (e) {
    console.error(e);
  }
};

function* workerGetCountInactiveStudios(action) {
  try {
    const response = yield call(getCountInactiveStudios);

    yield put({ type: RECEIVE_GET_COUNT_INACTIVE_STUDIOS, payload: response });
    
    yield put({ type: LOADING });

  } catch (e) {
    console.error(e);
  }
};

function* workerGetListSuspendStudios(acton) {
  try {
    const response = yield call(getListSuspendHolels);
    yield put({ type: RECEIVE_GET_LIST_SUSPEND_STUDIOS, payload: response });

    yield put({ type: LOADING });

  } catch (e) {
    console.error(e);
  }
};

export function* watcherGetInactiveStudios() {
  yield takeEvery(REQUEST_GET_INACTIVE_STUDIOS, workerGetInactiveStudios);
  yield takeEvery(REQUEST_UPDATE_STATUS_STUDIO, workerUpdateStatusStudio);
  yield takeEvery(REQUEST_GET_LIST_ACTIVE_STUDIOS, workerGetListActiveStudios);
  yield takeEvery(REQUEST_SEND_OWNER_MESSAGE, workerSendOwnerMessage);
  yield takeEvery(
    REQUEST_GET_COUNT_INACTIVE_STUDIOS,
    workerGetCountInactiveStudios
  );
  yield takeEvery(REQUEST_GET_LIST_SUSPEND_STUDIOS, workerGetListSuspendStudios);
};
