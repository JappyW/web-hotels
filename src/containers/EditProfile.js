import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  requestGetEditProfile,
  requestValidationProfile
} from "../actions/authAction";
import {
  uploadActionCreators,
  clearReduxField,
  onFileLoaded
} from "../actions/uploadActions";

import EditProfileForm from "../components/EditProfile/EditProfile.jsx";

function mapStateToProps(state) {
  return {
    upload: state.upload,
    user: state.dash.user,
    errorMessage: state.auth.errorMessage,
    file: state.dash.imageFile,
    image: state.dash.image,
    uploadError: state.upload.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestGetEditProfile: params => dispatch(requestGetEditProfile(params)),
    requestValidationProfile: params =>
      dispatch(requestValidationProfile(params)),
    uploadFiles: (files, id) =>
      dispatch(uploadActionCreators.uploadFiles(files, id)),
    uploadFilesFailed: error =>
      dispatch(uploadActionCreators.uploadFilesFailed(error)),
    onFileLoaded: imageFile => dispatch(onFileLoaded(imageFile)),
    clearReduxField: () => dispatch(clearReduxField)
  };
}

const EditProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "editprofile"
  })(EditProfileForm)
);

export default EditProfile;
