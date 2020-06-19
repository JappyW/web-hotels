
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import {
    requestRecoverPassword,
    requestValidationPassword
} from "../actions/authAction"

import RecoverPasswordForm from "../components/RecoverPassword/RecoverPassword.jsx"

function mapDispatchToProps(dispatch) {
  return {
    requestRecoverPassword: params => dispatch(requestRecoverPassword(params)),
    requestValidationPassword: params =>dispatch(requestValidationPassword(params))
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

const RecoverPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "recoverpassword"
  })(RecoverPasswordForm)
)

export default RecoverPassword
