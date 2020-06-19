import {
    CHANGE_STUDIO_MANAGEMENT_SUB_PAGE,
    REQUEST_GET_LIST_OWNER_STUDIOS,
    RECEIVE_GET_LIST_OWNER_STUDIOS  
} from '../constants/actionTypes';

export const changeStudioManagementSubPage = (params) => ({
    type: CHANGE_STUDIO_MANAGEMENT_SUB_PAGE,
    payload: {
        subPage: params.subPage,
        selectedStudio: params.selectedStudio
    }
})

export const requestGetListOwnerStudios = (payload) => ({ 
    type: REQUEST_GET_LIST_OWNER_STUDIOS, 
    payload
});

export const receiveResponseGetListOwnerStudios = (payload) => ({
    type: RECEIVE_GET_LIST_OWNER_STUDIOS, 
    payload
});


