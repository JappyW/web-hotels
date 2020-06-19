import {
    CHANGE_STUDIO_MANAGEMENT_SUB_PAGE,
    RECEIVE_GET_LIST_OWNER_STUDIOS 
} from '../constants/actionTypes';
import { STUDIO_MANAGEMENT_SUBPAGE, UNKNOWN_STUDIO } from '../constants/appCommonConsts';

const initialState = {
    studioManagementSubPage: STUDIO_MANAGEMENT_SUBPAGE.DEFAULT,
    selectedStudio: UNKNOWN_STUDIO,
    ownerStudios: []
}

function studioManagementReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_STUDIO_MANAGEMENT_SUB_PAGE:
            return {
                ...state,
                studioManagementSubPage: action.payload.subPage,
                selectedStudio: action.payload.selectedStudio
            }
        case RECEIVE_GET_LIST_OWNER_STUDIOS:
            return {
                ...state,
                ownerStudios: action.payload
            }
        default:
            return state
    }
}

export default studioManagementReducer;
