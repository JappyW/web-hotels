import { connect } from "react-redux";
import {
    requestUserCabinetCreatedOrders,
    requestPayForOrder
  } from "../actions/listOfUserOrdersAction"
  import ListOfCreatedUserOrdersComponent from "../components/ListOfUserOrders/ListOfCreatedUserOrders.jsx"

function mapStateToProps(state) {
  return {
    orders: state.userCabinetOrders.orders,
    errorMessage: state.userCabinetOrders.errorMessage,
    user: state.dash.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestPayForOrder: params => dispatch(requestPayForOrder(params)),
    requestUserCabinetCreatedOrders: params => dispatch(requestUserCabinetCreatedOrders(params))
  };
}

const ListOfCreatedUserOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfCreatedUserOrdersComponent);
export default ListOfCreatedUserOrders;
