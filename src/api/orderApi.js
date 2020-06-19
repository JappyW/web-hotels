import axios from "axios";
import { HOST, PAY, USERS } from "../constants/actionTypes";
import { exportSearchParams, EXPORT_SEARCH, EXPORT_ORDERS } from "../constants";
import { mergeEqualArrays, replaceSpecificSymbols } from "../helpers";

export const getRoomsInfo = async data => {
  const roomType = replaceSpecificSymbols(data.roomType);
  const startDate = data.startDate;
  const finishDate = data.finishDate;
  const studioName = replaceSpecificSymbols(data.studioName);
  const values = [studioName, roomType, startDate, finishDate];

  const searchParams = Object.values(exportSearchParams).map(el => `${el}=`);
  // searchParams.length must be equal values.length /// Order plays vital role
  const urlStringPart = mergeEqualArrays(searchParams, values).join("&");

  return await axios.post(`${HOST}/${EXPORT_SEARCH}?${urlStringPart}`);
};

export const postOrder = async data => {
  return await axios.post(`${HOST}/${EXPORT_ORDERS}`, data);
};


