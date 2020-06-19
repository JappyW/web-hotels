import axios from "axios";
import {HOST, STUDIOS_COMFORTS_URL} from "../constants/actionTypes";

export const getStudioComforts = async (id) => {
    return await axios.get(`${HOST}/${STUDIOS_COMFORTS_URL}/${id}`);
};

export const postComforts = async comfort => {
    return await axios.post(`${HOST}/${STUDIOS_COMFORTS_URL}`, comfort);
};

export const deleteComforts = async (room_id,comfort_id) => {
    return await axios.delete(`${HOST}/${STUDIOS_COMFORTS_URL}?room_id=${room_id}&comfort_id=${comfort_id}`);
};
