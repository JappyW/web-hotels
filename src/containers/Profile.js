import { connect } from "react-redux";
import {
  requestSignOut,
  requestVerificationEmail
} from "../actions/authAction";
import ProfileHome from "../components/UserProfile/UserProfile.jsx";
import { clearReduxField } from "../actions/uploadActions";

function mapStateToProps(state) {
  return {
    user: state.dash.user,
    image: state.dash.image
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearReduxField: () => dispatch(clearReduxField),
    requestSignOut: () => dispatch(requestSignOut()),
    requestVerificationEmail: params =>
      dispatch(requestVerificationEmail(params))
  };
}

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHome);
export default Profile;
