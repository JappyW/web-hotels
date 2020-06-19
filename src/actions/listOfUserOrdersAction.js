import {
  REQUEST_USER_CABINET_CREATED_ORDERS,
  RECEIVE_USER_CABINET_ORDERS,
  REQUEST_PAY_FOR_ORDERS,
  RECEIVE_PAY_FOR_ORDERS,
  RECEIVE_PAY_FOR_ORDER_ERROR,
  REQUEST_USER_CABINET_COMPLETED_ORDERS,
  REQUEST_USER_CABINET_PAID_ORDERS,
  REQUEST_OWNER_ORDERS,
  RECEIVE_OWNER_ORDERS
} from "../constants/actionTypes"

export const requestUserCabinetCreatedOrders = payload => ({
  type: REQUEST_USER_CABINET_CREATED_ORDERS,
  payload
})
export const receiveUserCabinetOrders = payload => ({
  type: RECEIVE_USER_CABINET_ORDERS,
  payload
})

export const requestUserCabinetPaidOrders = payload => ({
  type: REQUEST_USER_CABINET_PAID_ORDERS,
  payload
})

export const requestUserCabinetCompletedOrders = payload => ({
  type: REQUEST_USER_CABINET_COMPLETED_ORDERS,
  payload
})

export const requestPayForOrder = payload => ({
  type: REQUEST_PAY_FOR_ORDER,
  payload
})

export const receivePayForOrder = payload => ({
  type: RECEIVE_PAY_FOR_ORDER,
  payload
})

export const receivePayForOrderError = payload => ({
  type: RECEIVE_PAY_FOR_ORDER_ERROR,
  payload
})

export const requestOwnerOrders = payload => ({
  type: REQUEST_OWNER_ORDERS,
  payload
})

export const receiveOwnerOrders = payload => ({
  type: RECEIVE_OWNER_ORDERS,
  payload
})

