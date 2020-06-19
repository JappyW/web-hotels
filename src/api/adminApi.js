import axios from "axios";
import {
  HOST,
  ADMIN,
  STATUS,
  STUDIO,
  INACTIVE,
  STUDIO_URL,
  ACTIVE,
  FORM,
  EMAIL,
} from "../constants/actionTypes";
import { COUNT, SUSPEND, OWNER } from "../constants/apiUrl";

export const getInactiveStudios = async () => {
  const response = await axios.get(`${HOST}${ADMIN}/${STUDIO_URL}${INACTIVE}`);
  return response.data.data;
};

export const updateStatusStudio = async data => {
  const response = await axios.put(
    `${HOST}${ADMIN}${STATUS}${STUDIO}/${data.id}`,
    data
  );
  return response.data.data;
};

export const getListActiveHolels = async () => {
  const response = await axios.get(`${HOST}${ADMIN}/${STUDIO_URL}${ACTIVE}`);
  return response.data.data;
};

export const sendOwnerMessage = async data => {
  const response = await axios.post(`${HOST}${ADMIN}${FORM}${EMAIL}`, data)
  return response.data;
};

export const getCountInactiveStudios = async () => {

  const response = await axios.get(`${HOST}${ADMIN}/${STUDIO_URL}${INACTIVE}${COUNT}`);
  return response.data.data;
};

export const getListSuspendHolels = async () => {
  const response = await axios.get(`${HOST}${ADMIN}/${STUDIO_URL}${SUSPEND}`);
  return response.data.data;
};
