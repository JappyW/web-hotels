import { connect } from "react-redux";
import { Search } from "../components/Search/Search.jsx";
import {
  requestSearchStudios,
  inputSearchString,
  inputRoomType,
  selectStartDate,
  selectFinishDate,
  clearSearchInputs,
  requestSearchTips,
  setSong
} from "../actions/searchAction";

function mapStateToProps(state) {
  return {
    studios: state.studios.SearchlistStudios,
    currentPage: state.studios.currentPage,
    searchTips: state.studios.searchTips,
    searchData: {
      SearchCity: state.studios.inputSearchString,
      SearchRoomType: state.studios.inputRoomType,
      StartDate: state.studios.selectStartDate,
      FinishDate: state.studios.selectFinishDate,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSearchStudios: params => dispatch(requestSearchStudios(params)),
    requestSearchTips: params => dispatch(requestSearchTips(params)),
    inputSearchString: params => dispatch(inputSearchString(params)),
    inputRoomType: params => dispatch(inputRoomType(params)),
    selectStartDate: params => dispatch(selectStartDate(params)),
    selectFinishDate: params => dispatch(selectFinishDate(params)),
    clearSearchInputs: () => dispatch(clearSearchInputs()),
    setSong: params => dispatch(setSong(params))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);


