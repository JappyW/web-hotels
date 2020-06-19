import { connect } from "react-redux";
import {
  requestSignOut,
  requestVerificationEmail
} from "../actions/authAction";
import DashboardHome from "../components/Dashboard/Dashboard.jsx";
import { inactiveStatusStudios, getListActiveHolels, getCountInactiveStudios} from "../actions/adminAction";

function mapStateToProps(state) {
  return {
    user: state.dash.user,
    countInactiveStudios: state.adminReducer.countInactiveStudios,
    orders: state.userCabinetOrders.orders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountInactiveStudios: () => dispatch(getCountInactiveStudios()),
    inactiveStatusStudios: () => dispatch(inactiveStatusStudios()),
    getListActiveHolels: () => dispatch(getListActiveHolels()),
    requestSignOut: () => dispatch(requestSignOut()),
    requestVerificationEmail: params =>
      dispatch(requestVerificationEmail(params))
  };
}

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHome);
export default Dashboard;