import {
    RECEIVE_RESPONSE_POST_CREATE_STUDIO,
    REQUEST_POST_CREATE_STUDIO
} from '../constants/actionTypes';

const initialState = {
    studio: {},
    postResult: null
}

function createStudioReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_RESPONSE_POST_CREATE_STUDIO:
            return {
                ...state,
                postResult: action.payload
            };

        case REQUEST_POST_CREATE_STUDIO:
            return {
                ...state,
                studio: action.payload
            }
        default:
            return state
    }
}

export default createStudioReducer;
