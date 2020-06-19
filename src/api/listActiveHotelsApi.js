import axios from "axios";
import {
    HOST,
    ADMIN,
    STUDIO_URL,
    ACTIVE
} from "../constants/actionTypes";

export const getListActiveHolels = async () => {
    const response = await axios.get(`${HOST}${ADMIN}/${STUDIO_URL}${ACTIVE}`);
    return response.data.data;
}