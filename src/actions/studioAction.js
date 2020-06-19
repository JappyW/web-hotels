import {
  REQUEST_GET_STUDIOS,
  RECEIVE_GET_STUDIOS,
  REQUEST_GET_STUDIODETAILS,
  RECEIVE_GET_STUDIODETAILS,
  REQUEST_GET_FEEDBACK_BY_STUDIO_ID,
  REQUEST_GET_COMFORTS,
  RECEIVE_GET_COMFORTS,
  CLEAR_SEARCH,
  TOGGLE_MODAL,
  REQUEST_CURRENT_PAGE,
  RECEIVE_CURRENT_PAGE,
  TOGGLE_MODAL_CAROUSEL,
  TOGGLE_MODAL_FEEDBACK,
  RECEIVE_GET_FEEDBACK_BY_STUDIO_ID,
  REQUEST_COMFORTS_DELETED,
  RECEIVE_COMFORTS_DELETED,
  RECEIVE_COMFORT_ADDED,
  REQUEST_COMFORT_ADDED
} from "../constants/actionTypes";


export const requestGetStudios = () => ({ type: REQUEST_GET_STUDIOS });

export const receiveGetStudios = payload => ({
  type: RECEIVE_GET_STUDIOS,
  payload
});

export const requestGetStudioDetails = id => ({
  type: REQUEST_GET_STUDIODETAILS,
  payload: id
});

export const receiveGetStudioDetails = payload => ({
  type: RECEIVE_GET_STUDIODETAILS,
  payload
});

export const requestGetFeedbackByStudioId = (id, page,star) => ({
  type: REQUEST_GET_FEEDBACK_BY_STUDIO_ID,
  payload: {id,page,star}
});

export const receiveGetFeedbackByStudioId = payload => ({
  type: RECEIVE_GET_FEEDBACK_BY_STUDIO_ID,
  payload
});

export const requestGetComforts = id => ({
  type: REQUEST_GET_COMFORTS,
  payload: id
});

export const receiveGetComforts = payload => ({
  type: RECEIVE_GET_COMFORTS,
  payload
});

export const requestDeleteComforts = (room_id, comfort_id)=> ({
  type: REQUEST_COMFORTS_DELETED,
  payload: {room_id, comfort_id}
});

export const receiveDeleteComforts = payload => ({
  type: RECEIVE_COMFORTS_DELETED,
  payload
});

export const requestCreateComfort = (comfort)=> ({
  type: REQUEST_COMFORT_ADDED,
  payload: comfort
});

export const receiveCreateComfort = payload => ({
  type: RECEIVE_COMFORT_ADDED,
  payload
});

export const clearSearch = () => ({ type: CLEAR_SEARCH });

export const toggleModal = () => ({ type: TOGGLE_MODAL });

export const toggleModalCarousel = () => ({ type: TOGGLE_MODAL_CAROUSEL });

export const toggleModalFeedback = () => ({ type: TOGGLE_MODAL_FEEDBACK });

export const requestCurrentPage = payload => ({
  type: REQUEST_CURRENT_PAGE,
  payload
});

export const receiveCurrentPage = payload => ({
  type: RECEIVE_CURRENT_PAGE,
  payload
});
