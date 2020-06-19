import { call, put, takeEvery } from "redux-saga/effects";
import { REQUEST_POST_CREATE_STUDIO } from "../constants/actionTypes";
import * as actionCreator from "../actions/createStudioAction";
import { createStudio } from "../api/createStudioApi";

function* workerCreateStudio(action) {
    const studio = action.payload;
    try {
        const response =  yield call(createStudio, studio);
        yield put(actionCreator.receiveResponsePOSTCreateStudio(response.data.message));
    } catch (e) {
        console.error(e);
    }
}

export function* watcherCreateStudio() {
    yield takeEvery(REQUEST_POST_CREATE_STUDIO, workerCreateStudio);
}

