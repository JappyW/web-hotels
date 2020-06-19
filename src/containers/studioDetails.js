import {connect} from 'react-redux';
import {StudioDetails} from '../components/StudioDetails/StudioDetails.jsx';
import {FeedbackSearch} from '../components/StudioDetails/FeedbackSearch.jsx';
import {
    requestGetStudioDetails,
    toggleModal,
    toggleModalCarousel,
    toggleModalFeedback,
} from '../actions/studioAction';


function mapStateToProps(state) {
    return {
        studios: state.studioDetailsReducer.selectedStudio,
        rooms: state.studioDetailsReducer.selectedStudio.rooms || [],
        photos: state.studioDetailsReducer.selectedStudio.photos || [],
        address: state.studioDetailsReducer.selectedStudio.address,
        modal: state.studioDetailsReducer.modal,
        modalCarousel: state.studioDetailsReducer.modalCarousel,
        modalFeedback: state.studioDetailsReducer.modalFeedback,
        authTrue: state.auth.isAuthenticated
    }
};

function mapDispatchToProps(dispatch) {
    return{
        requestGetStudioDetails: (id) => dispatch(requestGetStudioDetails(id)),
        //requestGetFeedbackByStudioId: (id,page) => dispatch(requestGetFeedbackByStudioId(id,page)),
        toggleModal : () => dispatch(toggleModal()),
        toggleModalCarousel: () => dispatch(toggleModalCarousel()),
        toggleModalFeedback: () => dispatch(toggleModalFeedback()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioDetails);


