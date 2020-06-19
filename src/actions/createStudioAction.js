import {
    RECEIVE_RESPONSE_POST_CREATE_STUDIO,
    REQUEST_POST_CREATE_STUDIO,
} from '../constants/actionTypes';

export const requestPOSTCreateStudio = (studio) => ({ 
    type: REQUEST_POST_CREATE_STUDIO, 
    payload: studio 
});

export const receiveResponsePOSTCreateStudio = (payload) => ({
    type: RECEIVE_RESPONSE_POST_CREATE_STUDIO, 
    payload
});
