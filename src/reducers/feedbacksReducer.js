import { exportfeedbacksActions } from "../constants";

const initialState = {
  userOrders: [{}],
  userFeedbacks: [{}],
  feedbackData: {
    star: null,
    message: null,
    created_at: null,
    order_id: null,
    user_id: null
  }
};

function feedbacksReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case exportfeedbacksActions.RECEIVE_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      };

    case exportfeedbacksActions.RECEIVE_USER_FEEDBACKS:
      return {
        ...state,
        userFeedbacks: action.payload
      };

    case exportfeedbacksActions.REQUEST_POST_USER_FEEDBACK:
      return {
        ...state,
        data: action.payload
      };

    case exportfeedbacksActions.RECEIVE_POST_USER_FEEDBACK:
      return {
        ...state,
        postResult: action.payload
      };

    case exportfeedbacksActions.INPUT_FEEDBACK_STAR:
      return {
        ...state,
        feedbackData: { star: action.payload }
      };

    case exportfeedbacksActions.INPUT_FEEDBACK_MESSAGE:
      return {
        ...state,
        feedbackData: { message: action.payload }
      };

    default:
      return state;
  }
}

export default feedbacksReducer;
