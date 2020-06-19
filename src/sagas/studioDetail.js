import { call, put, takeEvery} from 'redux-saga/effects';
import {
    REQUEST_GET_STUDIODETAILS,
    RECEIVE_GET_STUDIODETAILS,
    REQUEST_GET_FEEDBACK_BY_STUDIO_ID, RECEIVE_GET_FEEDBACK_BY_STUDIO_ID
}
    from '../constants/actionTypes';
import {getStudioDetails, getFeedbackByStudioId } from '../api/studioDetailsApi';


function* workerGetStudioDetails(action){
    const id = action.payload;

    try {
        const response = yield call(getStudioDetails, id);
        yield put({type: RECEIVE_GET_STUDIODETAILS, payload: response.data.data});
    } catch (e){
        console.error(e);
    }
}

export function* watcherGetStudioDetails() {
    yield takeEvery(REQUEST_GET_STUDIODETAILS, workerGetStudioDetails)
}

function* workerGetFeedbackByStudioId(action){
    const {id, page, star} = action.payload;
    try {
        const response = yield call(getFeedbackByStudioId, id, page, star);
        const feedbackDetails = {
            feedback: response.data.data[0].feedback,
            count: response.data.data[0].feedbackCount[0].count,
        }
        yield put({type: RECEIVE_GET_FEEDBACK_BY_STUDIO_ID, payload: feedbackDetails});
    } catch (e){
        console.error(e);
    }
}

export function* watcherGetFeedbackByStudioId() {
    yield takeEvery(REQUEST_GET_FEEDBACK_BY_STUDIO_ID, workerGetFeedbackByStudioId)
}



