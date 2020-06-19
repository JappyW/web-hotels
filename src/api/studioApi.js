import axios from "axios";
import { STUDIO_URL, HOST, SEARCH_URL } from "../constants/actionTypes";
import * as helpers from "../helpers";

export const getStudios = async page => {
  const startDate = helpers.createDateFromNow(0);
  const finishDate = helpers.createDateFromNow(1);

  const response = await axios.post(
    `${HOST}/${SEARCH_URL}?ss=&room_type=&sdate=${startDate}&fdate=${finishDate}&page=${page}`
  );
  return response.data.data;
};
