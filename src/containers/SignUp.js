import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  requestOAuthGoogle,
  requestSignUp,
  requestValidationAuth
} from "../actions/authAction";

import SignUpForm from "../components/SignUp/SignUp.jsx";

function mapDispatchToProps(dispatch) {
  return {
    requestOAuthGoogle: params => dispatch(requestOAuthGoogle(params)),
    requestSignUp: params => dispatch(requestSignUp(params)),
    requestValidationAuth: params => dispatch(requestValidationAuth(params))
  };
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "signup"
  })(SignUpForm)
);

export default SignUp;
