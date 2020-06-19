import {
  REQUEST_GET_INACTIVE_STUDIOS,
  REQUEST_UPDATE_STATUS_STUDIO,
  REQUEST_GET_LIST_ACTIVE_STUDIOS,
  REQUEST_SEND_OWNER_MESSAGE,
  REQUEST_GET_COUNT_INACTIVE_STUDIOS,
  REQUEST_GET_LIST_SUSPEND_STUDIOS
} from "../constants/actionTypes";

export const inactiveStatusStudios = () => ({
  type: REQUEST_GET_INACTIVE_STUDIOS
});

export const updateStatusStudio = payload => ({
  type: REQUEST_UPDATE_STATUS_STUDIO,
  payload
});

export const getListActiveHolels = () => ({
  type: REQUEST_GET_LIST_ACTIVE_STUDIOS
});

export const sendOwnerMessage = payload => ({
  type: REQUEST_SEND_OWNER_MESSAGE,
  payload
});

export const getCountInactiveStudios = () => ({
  type: REQUEST_GET_COUNT_INACTIVE_STUDIOS
});

export const getListSuspendHolels = () => ({
  type: REQUEST_GET_LIST_SUSPEND_STUDIOS
});