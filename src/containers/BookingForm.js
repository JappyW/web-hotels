import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import BookForm from "../components/BookingForm/BookForm.jsx";
import {
  bookRoom,
  checkAvailability,
  clearPostResult,
  sendError
} from "../actions/bookingForm";
import { createDateFromNow } from "../helpers";

function mapDispatchToProps(dispatch) {
  return {
    bookRoom: order => dispatch(bookRoom(order)),
    checkAvailability: check => dispatch(checkAvailability(check)),
    sendError: error => dispatch(sendError(error)),
    clearPostResult: () => dispatch(clearPostResult())
  };
}

const selector = formValueSelector("bookingForm");

function mapStateToProps(state, ownProps) {
  const rtype = state.studios.inputRoomType;
  const sdate = state.studios.selectStartDate;
  const fdate = state.studios.selectFinishDate;

  const initValues = {
    roomType: rtype === null ? ownProps.roomTypes[0].name : rtype.inputRoomType,
    startDate: sdate === null ? createDateFromNow(1) : sdate.startDate,
    finishDate: fdate === null ? createDateFromNow(2) : fdate.finishDate
  };

  return {
    formValues: selector(state, "roomType", "startDate", "finishDate"),
    infoValues: {
      userId: state.dash.user.id,
      studioName: ownProps.dataInfo.name,
      city: ownProps.dataInfo.address.city
    },
    initialValues: initValues,
    postResult: state.bookingReducer.postResult,
    song: state.dash.song
  };
}

const BookingForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "bookingForm",
    enableReinitialize: true
  })(BookForm)
);

export default BookingForm;
