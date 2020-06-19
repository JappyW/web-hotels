import { exportfeedbacksActions } from "../constants";

export const requestUserOrders = userId => ({
  type: exportfeedbacksActions.REQUEST_USER_ORDERS,
  payload: userId
});
export const receiveUserOrders = payload => ({
  type: exportfeedbacksActions.RECEIVE_USER_ORDERS,
  payload
});

export const requestUserFeedbacks = userId => ({
  type: exportfeedbacksActions.REQUEST_USER_FEEDBACKS,
  payload: userId
});
export const receiveUserFeedbacks = payload => ({
  type: exportfeedbacksActions.RECEIVE_USER_FEEDBACKS,
  payload
});

export const requestPOSTFeedback = payload => ({
  type: exportfeedbacksActions.REQUEST_POST_USER_FEEDBACK,
  payload
});
export const receiveresponsePOSTFeedback = payload => ({
  type: exportfeedbacksActions.RECEIVE_POST_USER_FEEDBACK,
  payload
});
