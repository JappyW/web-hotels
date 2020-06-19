import {
  RECEIVE_GET_STUDIOS,
  RECEIVE_CURRENT_PAGE,
  RECEIVE_SEARCH_STUDIOS,
  RECEIVE_SEARCH_TIPS,
  INPUT_SEARCH_STRING,
  INPUT_ROOM_TYPE,
  SELECT_START_DATE,
  SELECT_FINISH_DATE,
  CLEAR_SEARCH_INPUTS,
  REQUEST_CURRENT_PAGE,
  LOADING
} from "../constants/actionTypes";

const initialState = {
  listHotls: [],
  searchTips: [],
  countPage: null,
  currentPage: null,
  inputSearchString: null,
  inputRoomType: null,
  selectStartDate: null,
  selectFinishDate: null,
  loading: false
};

export default function(state = { ...initialState }, action) {
  switch (action.type) {
    case RECEIVE_GET_STUDIOS:
      return {
        ...state,
        listHotls: action.payload
      };
    case RECEIVE_SEARCH_TIPS:
      return {
        ...state,
        searchTips: action.payload
      };

    case REQUEST_CURRENT_PAGE:
      return {
        ...state,
        loading: true,
        currentPage: action.payload
      };
    case RECEIVE_CURRENT_PAGE:
      return {
        ...state,
        listHotls: action.payload.studios,
        currentPage: action.payload.currentPage,
        countPage: action.payload.pageCount
      };
    case RECEIVE_SEARCH_STUDIOS:
      return {
        ...state,
        listHotls: action.payload,
        currentPage: action.payload.currentPage,
        countPage: action.payload.pageCount
      };

    case INPUT_SEARCH_STRING:
      return {
        ...state,
        inputSearchString: action.payload
      };

    case INPUT_ROOM_TYPE:
      return {
        ...state,
        inputRoomType: action.payload
      };

    case SELECT_START_DATE:
      return {
        ...state,
        selectStartDate: action.payload
      };

    case SELECT_FINISH_DATE:
      return {
        ...state,
        selectFinishDate: action.payload
      };

    case CLEAR_SEARCH_INPUTS:
      return {
        ...state,
        SearchlistStudios: [],
        inputSearchString: null,
        inputRoomType: null,
        selectStartDate: null,
        selectFinishDate: null
      };

    case LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}