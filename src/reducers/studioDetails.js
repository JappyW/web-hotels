import {
  REQUEST_GET_FEEDBACK_BY_STUDIO_ID,
  RECEIVE_GET_FEEDBACK_BY_STUDIO_ID,
  RECEIVE_GET_STUDIODETAILS,
  TOGGLE_MODAL,
  TOGGLE_MODAL_CAROUSEL,
  TOGGLE_MODAL_FEEDBACK
} from "../constants/actionTypes";

const initialState = {
  selectedStudio: {},
  feedbackByStudioId: [],
  feedbackCount: null,
  currentPage: null,
  countPage: null,
  modal: false,
  modalCarousel: false
};

function studioDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GET_STUDIODETAILS:
      return {
        ...state,
        selectedStudio: action.payload
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal
      };
    case TOGGLE_MODAL_CAROUSEL:
      return {
        ...state,
        modalCarousel: !state.modalCarousel
      };
    case TOGGLE_MODAL_FEEDBACK:
      return {
        ...state,
        modalFeedback: !state.modalFeedback
      };
    case RECEIVE_GET_FEEDBACK_BY_STUDIO_ID:
      return {
        ...state,
        feedbackByStudioId: action.payload.feedback,
        feedbackCount: action.payload.count
      };
    default:
      return state;
  }
}

export default studioDetailsReducer;
