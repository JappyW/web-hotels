import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import {
    requestChangePassword,
    requestValidationPassword
} from "../actions/authAction"

import ChangePasswordForm from "../components/ChangePassword"

function mapDispatchToProps(dispatch) {
  return {
    requestChangePassword: params => dispatch(requestChangePassword(params)),
    requestValidationPassword: params =>
      dispatch(requestValidationPassword(params))
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "changepassword"
  })(ChangePasswordForm)
)

export default ChangePassword
