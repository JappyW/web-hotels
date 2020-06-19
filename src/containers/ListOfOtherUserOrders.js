import { connect } from "react-redux";
import {
    requestUserCabinetPaidOrders,
    requestUserCabinetCompletedOrders,
  } from "../actions/listOfUserOrdersAction"
  import ListOfOtherUserOrdersComponent from "../components/ListOfUserOrders/ListOfOtherUserOrders.jsx"

function mapStateToProps(state) {
  return {
    orders: state.userCabinetOrders.orders,
    errorMessage: state.userCabinetOrders.errorMessage,
    user: state.dash.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestUserCabinetPaidOrders: params => dispatch(requestUserCabinetPaidOrders(params)),
    requestUserCabinetCompletedOrders: params => dispatch(requestUserCabinetCompletedOrders(params))
  };
}

const ListOfOtherUserOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfOtherUserOrdersComponent);
export default ListOfOtherUserOrders;
