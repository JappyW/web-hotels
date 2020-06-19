import {
  RECEIVE_GET_INACTIVE_STUDIOS,
  RECEIVE_UPDATE_STATUS_STUDIO,
  RECEIVE_GET_LIST_ACTIVE_STUDIOS,
  RECEIVE_GET_COUNT_INACTIVE_STUDIOS,
  RECEIVE_GET_LIST_SUSPEND_STUDIOS,
  LOADING,
  REQUEST_GET_LIST_ACTIVE_STUDIOS,
  REQUEST_GET_INACTIVE_STUDIOS,
  REQUEST_GET_LIST_SUSPEND_STUDIOS
} from "../constants/actionTypes";

const initialState = {
  notActiveStudios: [],
  countNotActiveStudios: null,
  listActiveStudios: [],
  countActiveStudios: null,
  countInactiveStudios: null,
  listSuspendStudios: [],
  countSuspendStudios: null,
  loading: false
};

const getUpdatedStudiosList = (studios, id) =>
  studios.filter(studio => studio.id !== id);

export default function (state = { ...initialState }, action) {
  switch (action.type) {
    case RECEIVE_GET_INACTIVE_STUDIOS:
      return {
        ...state,
        notActiveStudios: action.payload.notActiveStudios,
        countNotActiveStudios: action.payload.countNotActiveStudios
      };
    case REQUEST_GET_INACTIVE_STUDIOS: {
      return {
        ...state,
        loading: true
      };
    }
    case RECEIVE_GET_LIST_ACTIVE_STUDIOS:
      return {
        ...state,
        listActiveStudios: action.payload.listActiveStudios,
        countActiveStudios: action.payload.countActiveStudios
      };
    case REQUEST_GET_LIST_ACTIVE_STUDIOS: {
      return {
        ...state,
        loading: true
      };
    }
    case RECEIVE_UPDATE_STATUS_STUDIO:
      const newState = { ...state };
      return {
        newState,
        notActiveStudios: getUpdatedStudiosList(
          newState.notActiveStudios,
          action.payload.activateStudioId
        ),
        listActiveStudios: getUpdatedStudiosList(
          newState.listActiveStudios,
          action.payload.activateStudioId
        ),
        listSuspendStudios: getUpdatedStudiosList(
          newState.listSuspendStudios,
          action.payload.activateStudioId
        ),
        countNotActiveStudios: newState.countNotActiveStudios - 1,
        countActiveStudios: newState.countActiveStudios - 1,
        countInactiveStudios: newState.countInactiveStudios - 1,
        countSuspendStudios: newState.countSuspendStudios - 1
      };
    case RECEIVE_GET_COUNT_INACTIVE_STUDIOS:
      return {
        ...state,
        countInactiveStudios: action.payload.countInactiveStudios
      };
    case RECEIVE_GET_LIST_SUSPEND_STUDIOS:
      return {
        ...state,
        listSuspendStudios: action.payload.listSuspendStudios,
        countSuspendStudios: action.payload.countSuspendStudios
      };
    case REQUEST_GET_LIST_SUSPEND_STUDIOS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}
