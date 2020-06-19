import {
  RECEIVE_USER_CABINET_ORDERS,
  RECEIVE_PAY_FOR_ORDER,
  RECEIVE_PAY_FOR_ORDER_ERROR,
  RECEIVE_OWNER_ORDERS,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
  errorMessage: "",
};

function userCabinetOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_CABINET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case RECEIVE_PAY_FOR_ORDER:
      return {
        ...state,
        errorMessage: "",
      };
    case RECEIVE_OWNER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case RECEIVE_PAY_FOR_ORDER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export default userCabinetOrdersReducer;
