import axios from "axios";
import { HOST, STUDIO_ROOMS, STUDIO_ID_PARAM } from "../constants/apiUrl";

export const requestGetListRoomsInStudio = async (studioId) => {
    const response = await axios.get(`${HOST}${STUDIO_ROOMS}/?${STUDIO_ID_PARAM}=${studioId}`);
    return response.data.data;
};
