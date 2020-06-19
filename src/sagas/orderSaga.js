import { call, put, takeEvery } from "redux-saga/effects";
import { exportMessages, exportOrdersAction } from "../constants";
import { getRoomsInfo, postOrder } from "../api/orderApi";
import * as helpers from "../helpers";
import * as actionCreator from "../actions/bookingForm";

function* workerGetOrders(action) {
  const data = action.payload;

  try {
    const response = yield call(getRoomsInfo, data);
    yield put(actionCreator.recieveGetData(response.data.data));
    const responseData = response.data.data;
    const thisStudio = responseData.find(studio => studio.name === data.studioName);
    const roomsByType = thisStudio.rooms.filter(
      room => room.room_type.name === data.roomType
    );
    const firstFreeRoom = roomsByType.find(room => room.orders.length === 0);

    if (firstFreeRoom === undefined) {
      yield put(actionCreator.sendError(exportMessages.ERROR_MESSAGE));
      return;
    }
    const order = {
      createdAt: helpers.createDateFromNow(0),
      startDate: data.startDate,
      finishDate: data.finishDate,
      userId: data.userId,
      roomId: firstFreeRoom.id,
      song: data.song
    };
    yield put(actionCreator.bookRoom(order));
  } catch (e) {
    console.error(e);
  }
}

function* workerPostOrder(action) {
  const data = action.payload;

  try {
    const response = yield call(postOrder, data);
    yield put(
      actionCreator.receievePostResult(
        response.data.message + " Now, you can close this window :)"
      )
    );
  } catch (e) {
    console.error(e);
  }
}

export function* watcherGetOrders() {
  yield takeEvery(exportOrdersAction.CHECK_ROOM, workerGetOrders);
  yield takeEvery(exportOrdersAction.BOOK_ROOM, workerPostOrder);
}
