import { call, put, takeEvery } from "redux-saga/effects";
import {
  REQUEST_SEARCH_STUDIOS, REQUEST_SEARCH_TIPS  
} from "../constants/actionTypes";
import { searchStudios, searchTips } from "../api/searchApi";
import { receiveCurrentPage} from "../actions/studioAction";
import { receiveSearchTips} from "../actions/searchAction";
 
function* workerSearchStudios(action) {
  try {
    const response = yield call(searchStudios, action.payload);
    const currentPageDetails = {
      studios: response[0].studiosList,
      currentPage: action.payload.currentPage,
      pageCount: response[0].pageCount
    };
    yield put(receiveCurrentPage(currentPageDetails));
  } catch (e) {
    console.error(e);
  }
}

function* workerSearchTips(action) {
  try {
    const response = yield call(searchTips, action.payload);
    yield put(receiveSearchTips(response));
  } catch (e) {
    console.error(e);
  }
}

export function* watcherSearchStudios() {
  yield takeEvery(REQUEST_SEARCH_STUDIOS, workerSearchStudios);
  yield takeEvery(REQUEST_SEARCH_TIPS, workerSearchTips);
  
}
