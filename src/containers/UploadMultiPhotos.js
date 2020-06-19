import { connect } from "react-redux";
import DropZone from "../components/UploadMultiPhotos/DropZone.jsx";
import { uploadActionCreators, clearReduxField } from "../actions/uploadActions";

function mapStateToProps(state, ownProps) {
    const collectionSuccess = state.upload.collection.collection_success;
    const collectionError = state.upload.collection.collection_error;

    return {
        collectionSuccess,
        collectionError,
        userId: state.dash.user.id,
        selectedStudio: state.studioManagementReducer.selectedStudio
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadCollection: (files, id) => {
            return dispatch(uploadActionCreators.uploadFiles(files, id))
        },
        clearReduxField: () => dispatch(clearReduxField)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone);
