import { connect } from 'react-redux';
import CreateStudio from '../components/CreateStudio/CreateStudio.jsx';
import {
    requestPOSTCreateStudio,
    receiveResponsePOSTCreateStudio,
} from '../actions/createStudioAction';

function mapStateToProps(state) {
    return {
        studio: state.createStudioReducer.studio
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestPOSTCreateStudio: (params) => dispatch(
            requestPOSTCreateStudio(params)
        ),
        receiveResponsePOSTCreateStudio: (params) => dispatch(
            receiveResponsePOSTCreateStudio(params)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudio);
