import { call, put, takeEvery} from 'redux-saga/effects';
import {
    REQUEST_GET_LIST_OWNER_STUDIOS,
} from '../constants/actionTypes';
import {requestGetListOwnerStudios} from '../api/studioManagementApi';
import * as actionCreator from "../actions/studioManagementAction";

function* workerGetListOwnerStudios(action){
    const studioId = action.payload;
    try {
        const response = yield call(requestGetListOwnerStudios, studioId);
        yield put(actionCreator.receiveResponseGetListOwnerStudios(response));
    } catch (e){
        console.error(e);
    }
}

export function* watcherGetListOwnerStudios() {
    yield takeEvery(REQUEST_GET_LIST_OWNER_STUDIOS, workerGetListOwnerStudios)
}