import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  requestOAuthGoogle,
  requestSignIn,
  requestValidationAuth
} from "../actions/authAction";
import SignInForm from "../components/SignIn/SignIn.jsx";

function mapDispatchToProps(dispatch) {
  return {
    requestOAuthGoogle: params => dispatch(requestOAuthGoogle(params)),
    requestSignIn: params => dispatch(requestSignIn(params)),
    requestValidationAuth: params => dispatch(requestValidationAuth(params))
  };
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "signin"
  })(SignInForm)
);

export default SignIn;
