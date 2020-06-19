import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminComponent } from "../components/AdminComponent/AdminComponent.jsx";
import {
  inactiveStatusStudios,
  updateStatusStudio,
  getListActiveHolels,
  getCountInactiveStudios,
  getListSuspendHolels
} from "../actions/adminAction";

function mapStateToProps(state) {
  return {
    inactiveStatusStudios: state.inactiveStatusStudios,
    notActiveStudios: state.adminReducer.notActiveStudios,
    countNotActiveStudios: state.adminReducer.countNotActiveStudios,
    updateStatusStudio: state.adminReducer.inactiveStatusStudios,
    listActiveStudios: state.adminReducer.listActiveStudios,
    countActiveStudios: state.adminReducer.countActiveStudios,
    countInactiveStudios: state.adminReducer.countInactiveStudios,
    listSuspendStudios: state.adminReducer.listSuspendStudios,
    countSuspendStudios: state.adminReducer.countSuspendStudios,
    loading: state.adminReducer.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inactiveStatusStudios: bindActionCreators(inactiveStatusStudios, dispatch),
    updateStatusStudio: bindActionCreators(updateStatusStudio, dispatch),
    getListActiveHolels: bindActionCreators(getListActiveHolels, dispatch),
    getCountInactiveStudios: bindActionCreators(getCountInactiveStudios, dispatch),
    getListSuspendHolels: bindActionCreators(getListSuspendHolels, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent);