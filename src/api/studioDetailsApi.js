import axios from "axios";
import {HOST, STUDIO_URL, SEARCH_URL, STUDIOS_FEEDBACK_URL} from '../constants/actionTypes';

export const getStudioDetails = async (id) => {
    return await axios.get(`${HOST}/${STUDIO_URL}/${id}`);
};

export const getFeedbackByStudioId= async (id,page,star) => {
    star = star ? star : "";
    return await axios.get(`${HOST}/${STUDIOS_FEEDBACK_URL}/${SEARCH_URL}?id=${id}&page=${page}&star=${star}`);
};








