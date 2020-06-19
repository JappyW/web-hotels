import { call, put, takeLatest, takeEvery } from "redux-saga/effects"
import { getPayForOrder, getUserCabinetCreatedOrders, getUserCabinetPaidOrders, getUserCabinetCompletedOrders, getOwnerOrders } from "../api/listOfUserOrdersApi"
import { receiveUserCabinetOrders, receivePayForOrder,receivePayForOrderError, receiveOwnerOrders } from "../actions/listOfUserOrdersAction"
import { REQUEST_USER_CABINET_CREATED_ORDERS, REQUEST_PAY_FOR_ORDER, REQUEST_USER_CABINET_PAID_ORDERS, REQUEST_USER_CABINET_COMPLETED_ORDERS, REQUEST_OWNER_ORDERS, SUCCESS } from "../constants/actionTypes"

function* workerGetUserCabinetCreatedOrders(action) {
  try {
    const response = yield call(getUserCabinetCreatedOrders, action.payload)
    yield put(receiveUserCabinetOrders(response))
  } catch (e) {
    console.error(e)
  }
}

export function* watcherGetUserCabinetCreatedOrders() {
  yield takeLatest(REQUEST_USER_CABINET_CREATED_ORDERS, workerGetUserCabinetCreatedOrders)
}

function* workerGetUserCabinetPaidOrders(action) {
  try {
    const response = yield call(getUserCabinetPaidOrders, action.payload)
    yield put(receiveUserCabinetOrders(response))
  } catch (e) {
    console.error(e)
  }
}

export function* watcherGetUserCabinetPaidOrders() {
  yield takeLatest(REQUEST_USER_CABINET_PAID_ORDERS, workerGetUserCabinetPaidOrders)
}

function* workerGetUserCabinetCompletedOrders(action) {
  try {
    const response = yield call(getUserCabinetCompletedOrders, action.payload)
    yield put(receiveUserCabinetOrders(response))
  } catch (e) {
    console.error(e)
  }
}

export function* watcherGetUserCabinetCompletedOrders() {
  yield takeLatest(REQUEST_USER_CABINET_COMPLETED_ORDERS, workerGetUserCabinetCompletedOrders)
}

function* workerGetPayForOrder(action) {
  try {
    const response = yield call(getPayForOrder, action.payload)
    if(response.status == SUCCESS){
      yield put(receivePayForOrder(response.data))
    } else{
      yield put(receivePayForOrderError(response.message))
    }
  } catch (e) {
    console.error("error",e)
  }
}

export function* watcherGetPayForOrder() {
  yield takeEvery(REQUEST_PAY_FOR_ORDER, workerGetPayForOrder)
}

export function* watcherGetOwnerOrders() {
  yield takeLatest(REQUEST_OWNER_ORDERS, workerGetOwnerOrders)
}

function* workerGetOwnerOrders(action) {
  try {
    const response = yield call(getOwnerOrders, action.payload)
    yield put(receiveOwnerOrders(response))
  } catch (e) {
    console.error(e)
  }
}
