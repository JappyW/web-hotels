import { connect } from 'react-redux';
import ManageStudioRooms from '../components/ManageStudioRooms/ManageStudioRooms.jsx';
import {
    requestGetListRoomsInStudio,
    receiveResponseGetListRoomsInOneStudio
} from '../actions/manageStudioRoomsAction';

function mapStateToProps(state) {
    return {
        userId: state.dash.user.id,
        // selectedStudio: state.studioManagementReducer.selectedStudio,
        // selectedStudioId: state.studioManagementReducer.selectedStudio.id,
        selectedStudioRooms: state.manageStudioRoomsReducer.selectedStudioRooms
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestGetListRoomsInStudio: (params) => dispatch(
            requestGetListRoomsInStudio(params)
        ),
        receiveResponseGetListRoomsInOneStudio: (params) => dispatch(
            receiveResponseGetListRoomsInOneStudio(params)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudioRooms);
