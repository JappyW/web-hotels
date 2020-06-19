import axios from "axios";
import { HOST, ORDERS_URL, FEEDBACKS_URL } from "../constants/actionTypes";

export const getUserOrders = async userId => {
  const response = await axios.get(`${HOST}/${ORDERS_URL}/${userId}`);
  return response.data.data;
};

export const getUserFeedbacks = async userId => {
  const response = await axios.get(`${HOST}/${FEEDBACKS_URL}/${userId}`);
  return response.data.data;
};

export const postFeedback = async data => {
  return await axios.post(`${HOST}/${FEEDBACKS_URL}`, data);
};
