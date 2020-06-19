import { connect } from "react-redux";
import { Studios } from "../components/Studios/Studios.jsx";
import { requestGetStudios, requestCurrentPage } from "../actions/studioAction";
import {
  toggleModal,
} from '../actions/studioAction';

function mapStateToProps(state, props) {
  return {
    defaultPage: props.defaultPage,
    studios: state.studios.listHotls,
    pageSize: state.studios.pageSize,
    currentPage: state.studios.currentPage,
    countPage: state.studios.countPage,
    totalStudiosCount: state.studios.totalStudiosCount,
    loading: state.studios.loading,
    modal: state.studioDetailsReducer.modal,
    authTrue: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestGetStudios: () => dispatch(requestGetStudios()),
    requestCurrentPage: (page) => dispatch(requestCurrentPage(page)),
    toggleModal : () => dispatch(toggleModal()),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Studios);