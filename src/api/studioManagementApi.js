import axios from "axios";
import { HOST, OWNER } from "../constants/apiUrl";

export const requestGetListOwnerStudios = async (studioId) => {
    const response = await axios.get(`${HOST}${OWNER}/${studioId}`);
    return response.data.data;
};