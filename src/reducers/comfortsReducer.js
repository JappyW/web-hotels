import {
    RECEIVE_COMFORTS_DELETED,
    RECEIVE_GET_COMFORTS,
    RECEIVE_COMFORT_ADDED
} from "../constants/actionTypes";

const initialState = {
    rooms: [],
    comfort: [],
};

function comfortsReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_GET_COMFORTS:
            return {
                ...state,
                rooms: action.payload.rooms,
            };
        case RECEIVE_COMFORTS_DELETED:
            return {
                rooms: state.filter((comforts) => comforts.comfort.id !== action.payload.id)
            };
        case RECEIVE_COMFORT_ADDED:
            return {
                ...state,
                comfort: [...state.comfort, action.payload]
            };
        default:
            return state;
    }
}

export default comfortsReducer;
