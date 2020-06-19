import axios from "axios"
import {
    ORDERS_URL, USERS, PAY_URL, HOST, CREATED_URL, PAID_URL, COMPLETED_URL, OWNER_URL
} from "../constants/actionTypes"


export const getUserCabinetCreatedOrders = async data => {
    const response = await axios.post(`${USERS}/${ORDERS_URL}/${CREATED_URL}`, {
      data
    });
    return response.data.data
}

export const getUserCabinetPaidOrders = async data => {
  const response = await axios.post(`${USERS}/${ORDERS_URL}/${PAID_URL}`, {
    data
  });
  return response.data.data
}

export const getUserCabinetCompletedOrders = async data => {
  const response = await axios.post(`${USERS}/${ORDERS_URL}/${COMPLETED_URL}`, {
    data
  });
  return response.data.data
}

export const getPayForOrder = async data => {
  return await axios.post(`${HOST}/${ORDERS_URL}/${PAY_URL}`, {
    data
  }).then(response => {
    return response.data
 })
 .catch(error => {
    return Promise.resolve(error.response.data)
 })
}

export const getOwnerOrders = async data => {
  const response = await axios.post(`${USERS}/${ORDERS_URL}/${OWNER_URL}`, {
    data
  });
  return response.data.data
}
