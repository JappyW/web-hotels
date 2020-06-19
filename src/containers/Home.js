import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Home from "../components/Home/Home.jsx";
import { clearSearch } from "../actions/studioAction";

function mapDispatchToProps(dispatch) {
  return {
    clearSearch: bindActionCreators(clearSearch, dispatch)
  };
}

const HomeConnected = connect(
  null,
  mapDispatchToProps
)(Home);

export default HomeConnected;
