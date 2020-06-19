import { connect } from "react-redux"
import {
    requestVerifyUser,
    requestGetDashboard,
    
  } from "../actions/authAction"
  import VerifyComp from "../components/Verify/Verify.jsx"

  function mapDispatchToProps(dispatch) {
    return {
      requestVerifyUser: params => dispatch(requestVerifyUser(params)),
      requestGetDashboard: params => dispatch(requestGetDashboard(params)),
    }
  }

function mapStateToProps(state) {
    return {
      user: state.dash.user
    }
  }
  

  
  const Verify = connect(
    mapStateToProps,
    mapDispatchToProps
  )(VerifyComp)
  export default Verify