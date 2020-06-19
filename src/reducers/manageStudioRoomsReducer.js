import {
    RECEIVE_GET_LIST_ROOMS_IN_ONE_STUDIO
} from '../constants/actionTypes';

const initialState = {
    selectedStudioId: 0,
    selectedStudioRooms: []
}

function manageStudioRoomsReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_GET_LIST_ROOMS_IN_ONE_STUDIO:
            return {
                ...state,
                selectedStudioRooms: action.payload || []
            }
        default:
            return state
    }
}

export default manageStudioRoomsReducer;