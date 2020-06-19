import { connect } from "react-redux";
import { Feedbacks } from "../components/Feedbacks/feedbacks.jsx";

import {
  requestUserOrders,
  requestUserFeedbacks,
  requestPOSTFeedback
} from "../actions/feedbacksAction";

function mapStateToProps(state) {
  return {
    userOrders: state.feedbacksReducer.userOrders,
    userFeedbacks: state.feedbacksReducer.userFeedbacks,
    user: state.dash.user,
    feedbackData: {
      star: state.feedbacksReducer.star,
      message: state.feedbacksReducer.message,
      created_at: state.feedbacksReducer.created_at,
      order_id: state.feedbacksReducer.order_id,
      user_id: state.feedbacksReducer.user_id
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestUserOrders: params => dispatch(requestUserOrders(params)),
    requestUserFeedbacks: params => dispatch(requestUserFeedbacks(params)),
    requestPOSTFeedback: params => dispatch(requestPOSTFeedback(params))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedbacks);
