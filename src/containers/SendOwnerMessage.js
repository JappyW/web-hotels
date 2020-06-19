import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SendOwnerMessageForm from "../components/AdminComponent/SendOwnerMessage/SendOwnerMessage.jsx";
import { sendOwnerMessage } from "../actions/adminAction"

function mapDispatchToProps(dispatch) {
  return {
    sendOwnerMessage: params => dispatch(sendOwnerMessage(params)),

  };
}

function mapStateToProps(state) {
  return {};
}

const SendOwnerMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({

    form: "sendOwnerMessage"
  })(SendOwnerMessageForm)
);
export default SendOwnerMessage;