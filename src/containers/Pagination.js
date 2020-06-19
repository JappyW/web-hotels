import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  Pagination  from "../components/reusableComponents/Pagination/Pagination.jsx";
import { requestCurrentPage } from "../actions/studioAction";
import {getArrayFromNumber} from "../helpers";

function mapStateToProps(state) {
  return {
    studios: state.studios.listHotls,
    pagesList: getArrayFromNumber(state.studios.countPage),
    countPage: state.studios.countPage,
    currentPage: state.studios.currentPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestCurrentPage: bindActionCreators(requestCurrentPage, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
