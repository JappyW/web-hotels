import { ordersAction }  from "../../constants/actionTypes";

export const bookRoom = payload => ({ type: ordersAction.BOOK_ROOM, payload });
export const checkAvailability = payload => ({ type: ordersAction.CHECK_ROOM, payload });
export const recieveGetData = payload => ({ type: ordersAction.RECEIVE_GET_DATA, payload });
export const receievePostResult = payload => ({ type: ordersAction.RECEIVE_POST_RESULT, payload });
export const sendError = payload => ({ type: ordersAction.SEND_ERROR, payload });
export const clearPostResult = () => ({ type: ordersAction.CLEAR_POST_RESULT });