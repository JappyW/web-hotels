import { call, put, takeEvery} from 'redux-saga/effects';
import {
    REQUEST_GET_COMFORTS,
    RECEIVE_GET_COMFORTS,
    RECEIVE_COMFORTS_DELETED,
    REQUEST_COMFORTS_DELETED,
    RECEIVE_COMFORT_ADDED,
    REQUEST_COMFORT_ADDED
}
    from '../constants/actionTypes';
import {getStudioComforts, deleteComforts} from '../api/ComfortsApi';
import {createStudio} from "../api/createStudioApi";
import * as actionCreator from "../actions/createStudioAction";


function* workerGetStudioComforts(action){
    const id = action.payload;

    try {
        const response = yield call(getStudioComforts, id);
        yield put({type: RECEIVE_GET_COMFORTS, payload: response.data.data});
    } catch (e){
        console.error(e);
    }
}

export function* watcherGetStudioComforts() {
    yield takeEvery(REQUEST_GET_COMFORTS, workerGetStudioComforts)
}


function* workerDeleteComforts(action){
    const {room_id, comfort_id} = action.payload;
    try {
        const response = yield call(deleteComforts, room_id, comfort_id);
        yield put({type: RECEIVE_COMFORTS_DELETED, payload: {room_id, comfort_id}});
    } catch (e){
        console.error(e);
    }
}

export function* watcherDeleteComforts() {
    yield takeEvery(REQUEST_COMFORTS_DELETED, workerDeleteComforts)
}


function* workerCreateComfort(action) {
    const comfort = action.payload;
    try {
        const response =  yield call(createStudio, comfort);
        yield put({type: RECEIVE_COMFORT_ADDED, payload: response.data.data});
    } catch (e) {
        console.error(e);
    }
}

export function* watcherCreateComfort() {
    yield takeEvery(REQUEST_COMFORT_ADDED, workerCreateComfort);
}




