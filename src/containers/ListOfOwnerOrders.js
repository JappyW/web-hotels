import { connect } from "react-redux";
import {
  requestOwnerOrders,
  } from "../actions/listOfUserOrdersAction"
  import ListOfOwnerOrdersComponent from "../components/ListOfUserOrders/ListOfOwnerOrders.jsx"

function mapStateToProps(state) {
  return {
    orders: state.userCabinetOrders.orders,
    errorMessage: state.userCabinetOrders.errorMessage,
    user: state.dash.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestOwnerOrders: params => dispatch(requestOwnerOrders(params)),
  };
}

const ListOfOwnerOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfOwnerOrdersComponent);
export default ListOfOwnerOrders;
