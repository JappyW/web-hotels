import {
    REQUEST_SEARCH_STUDIOS,
    RECEIVE_SEARCH_STUDIOS,
    REQUEST_SEARCH_TIPS, 
    RECEIVE_SEARCH_TIPS,
    INPUT_SEARCH_STRING,
    INPUT_ROOM_TYPE,
    SELECT_START_DATE,
    SELECT_FINISH_DATE,
    SELECT_ROOM_TYPE,
    CLEAR_SEARCH_INPUTS,
    SET_SONG
} from '../constants/actionTypes';

export const requestSearchStudios = (data) => ({type: REQUEST_SEARCH_STUDIOS, payload: data});
export const receiveSearchStudios = (payload) => ({type: RECEIVE_SEARCH_STUDIOS, payload});
export const requestSearchTips = (data) => ({type: REQUEST_SEARCH_TIPS, payload: data});
export const receiveSearchTips = (payload) => ({type: RECEIVE_SEARCH_TIPS, payload});
export const inputSearchString = (payload) => ({type: INPUT_SEARCH_STRING, payload});
export const inputRoomType = (payload) => ({type: INPUT_ROOM_TYPE, payload});
export const selectStartDate = (payload) => ({type: SELECT_START_DATE, payload});
export const selectFinishDate = (payload) => ({type: SELECT_FINISH_DATE, payload});
export const selectRoomType = (payload) => ({type: SELECT_ROOM_TYPE, payload});
export const clearSearchInputs = () => ({type: CLEAR_SEARCH_INPUTS}) 
export const setSong = (payload) => ({type: SET_SONG, payload}) 
  