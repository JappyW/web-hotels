import { connect } from 'react-redux';
import StudioManagement from '../components/StudioManagement/StudioManagement.jsx';
import {
    changeStudioManagementSubPage,
    requestGetListOwnerStudios,
    receiveResponseGetListOwnerStudios
} from '../actions/studioManagementAction';

function mapStateToProps(state) {
    return {
        userId: state.dash.user.id,
        studioManagementSubPage: state.studioManagementReducer.studioManagementSubPage,
        ownerStudios: state.studioManagementReducer.ownerStudios
    }
}

function mapDispatchToProps(dispatch) {
    return{
        changeStudioManagementSubPage: (data) => dispatch(
            changeStudioManagementSubPage({
                subPage: data.subPage,
            })
        ),
        requestGetListOwnerStudios: (params) => dispatch(
            requestGetListOwnerStudios(params)
        ),
        receiveResponseGetListOwnerStudios: (params) => dispatch(
            receiveResponseGetListOwnerStudios(params)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioManagement);
