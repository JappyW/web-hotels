import axios from "axios";
import { HOST, SEARCH_URL } from "../constants/actionTypes";

export const searchStudios = async data => {
  const ss = data.searchData.SearchCity ? data.searchData.SearchCity.inputSearchString : "";
  const roomType = (!data.searchData.SearchRoomType) || (data.searchData.SearchRoomType.inputRoomType=="Any") ? "" : data.searchData.SearchRoomType.inputRoomType;
  const startDate = data.searchData.StartDate ? data.searchData.StartDate.startDate : ""
  const finishDate = data.searchData.FinishDate ? data.searchData.FinishDate.finishDate : ""
  const curentPage = 1;
  const amenities = data.amenities ? data.amenities : amenities[0] = acoustic_grand_piano;
  const response = await axios.post(
    `${HOST}/${SEARCH_URL}?ss=${ss}&room_type=${roomType}&sdate=${startDate}&fdate=${finishDate}&page=${curentPage}`, {amenities}
  );
  return response.data.data;
}

export const searchTips = async data => {
   const response = await axios.get(
      `${HOST}/${SEARCH_URL}/tips?ss=${data}&room_type=&sdate=&fdate=`
    );
    return response.data.data;
  }
 
