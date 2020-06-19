import {connect} from 'react-redux';
import {Comforts} from '../components/StudioManagement/Comforts.jsx';
import {
    requestGetComforts,
    requestDeleteComforts
} from '../actions/studioAction';


function mapStateToProps(state) {
    return {
        rooms: state.comfortsReducer.rooms || [],
    }
};

function mapDispatchToProps(dispatch) {
    return{
        requestGetComforts: (id) => dispatch(requestGetComforts(id)),
        requestDeleteComforts: (room_id,comfort_id) => dispatch(requestDeleteComforts(room_id,comfort_id)),
        requestCreateComfort: (params) => dispatch(requestCreateComfort(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comforts);


