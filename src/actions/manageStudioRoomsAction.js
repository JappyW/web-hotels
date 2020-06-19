import {
    REQUEST_GET_LIST_ROOMS_IN_ONE_STUDIO,
    RECEIVE_GET_LIST_ROOMS_IN_ONE_STUDIO,
} from '../constants/actionTypes';

export const requestGetListRoomsInStudio = (payload) => ({ 
    type: REQUEST_GET_LIST_ROOMS_IN_ONE_STUDIO, 
    payload
});

export const receiveResponseGetListRoomsInOneStudio = (payload) => ({
    type: RECEIVE_GET_LIST_ROOMS_IN_ONE_STUDIO, 
    payload
});
