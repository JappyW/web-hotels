import { connect } from 'react-redux';
import ManageStudioComforts from '../components/ManageStudioComforts/ManageStudioComforts.jsx';

// template for future filling:
//
// import {
//     ??
// } from '../actions/?Action';

function mapStateToProps(state) {
    return {
        userId: state.dash.user.id,
        selectedStudio: state.studioManagementReducer.selectedStudio
    }
}

// template for future filling:
//
// function mapDispatchToProps(dispatch) {
//     return {
//        doSomth: (params) => dispatch(
//            doSometh(params)
//        )
//     }
// }

export default connect(mapStateToProps/*, mapDispatchToProps*/)(ManageStudioComforts);
