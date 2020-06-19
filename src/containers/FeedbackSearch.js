import {connect} from 'react-redux';
import FeedbackSearch from '../components/StudioDetails/FeedbackSearch.jsx';
import {
   requestGetFeedbackByStudioId,

} from '../actions/studioAction';

function mapStateToProps(state) {
    return {
        feedback: state.studioDetailsReducer.feedbackByStudioId,
        feedbackCount: state.studioDetailsReducer.feedbackCount,
    }
};

function mapDispatchToProps(dispatch) {
    return{
        requestGetFeedbackByStudioId: (id,page,star) => dispatch(requestGetFeedbackByStudioId(id,page,star)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackSearch);

