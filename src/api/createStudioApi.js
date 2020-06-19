import axios from "axios";
import { HOST, STUDIO_URL } from "../constants/actionTypes";

export const createStudio = async (studio) => {
    return await axios.post(`${HOST}/${STUDIO_URL}/`, studio);
};
