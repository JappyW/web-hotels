import { exportOrdersAction } from "../constants";

const initialState = {
  orders: [],
  ordersInfo: {
    roomType: null,
    startDate: null,
    finishDate: null
  },
  postResult: {
    success: null,
    error: null
  }
};

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case exportOrdersAction.BOOK_ROOM:
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case exportOrdersAction.CHECK_ROOM:
      return {
        ...state
      };
    case exportOrdersAction.RECEIVE_GET_DATA:
      return {
        ...state,
        receiveData: action.payload
      };
    case exportOrdersAction.RECEIVE_POST_RESULT:
      return {
        ...state,
        postResult: {
          success: action.payload,
          error: null
        }
      };
    case exportOrdersAction.CLEAR_POST_RESULT:
      return {
        ...state,
        postResult: {
          success: null,
          error: null
        }
      };
    case exportOrdersAction.SEND_ERROR:
      return {
        ...state,
        postResult: {
          success: null,
          error: action.payload
        }
      };
    default:
      return state;
  }
}

export default bookingReducer;
