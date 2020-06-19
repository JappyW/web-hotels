
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import {
    requestSendRecoveryEmail
} from "../actions/authAction"

import ForgotPasswordForm from "../components/ForgotPassword/ForgotPassword.jsx"

function mapDispatchToProps(dispatch) {
  return {
    requestSendRecoveryEmail: params => dispatch(requestSendRecoveryEmail(params)),
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

const ForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "forgotpassword"
  })(ForgotPasswordForm)
)

export default ForgotPassword
