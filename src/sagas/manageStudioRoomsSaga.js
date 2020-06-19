import { call, put, takeEvery} from 'redux-saga/effects';
import {
    REQUEST_GET_LIST_ROOMS_IN_ONE_STUDIO,
} from '../constants/actionTypes';
import {requestGetListRoomsInStudio} from '../api/manageStudioRoomsApi';
import * as actionCreator from "../actions/manageStudioRoomsAction";

function* workerGetStudioRooms(action){
    const studioId = action.payload;
    try {
        const response = yield call(requestGetListRoomsInStudio, studioId);
        yield put(actionCreator.receiveResponseGetListRoomsInOneStudio(response));
    } catch (e){
        console.error(e);
    }
}

export function* watcherGetStudioRooms() {
    yield takeEvery(REQUEST_GET_LIST_ROOMS_IN_ONE_STUDIO, workerGetStudioRooms)
}
