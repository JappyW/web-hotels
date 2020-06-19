import React, { Component } from "react";
import * as helpers from "../../helpers";
import PropTypes from "prop-types";
import BookingForm from "../../containers/BookingForm.js";
import { ImageHeader } from "../reusableComponents/ImageHeader/ImageHeader.jsx";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

class BookingWrapper extends Component {
  constructor(props) {
    super(props);
    this.info = this.getInitData();
  }

  getInitData() {
    return {
      roomTypes: helpers.getUniqueRoomTypes(this.props.dataInfo)
    };
  }

  closeModal() {
    this.props.onRequestClose();
  }

  render() {
    const cardStyles = {
      minWidth: `320px`
    };
    return (
      <div className="booking-form card pt-0" style={cardStyles}>
        <ImageHeader
          label={i18n.t("BOOKING.BOOKING_LABEL")}
          bgImage="../../../public/images/swimpool.jpg"
          wrapperClasses="card-header bg-info text-white"
          headingClasses="mb-0 py-2"
        />
        <div className="card-body px-4">
          <BookingForm
            roomTypes={this.info.roomTypes}
            dataInfo={this.props.dataInfo}
            closeModal={() => this.closeModal()}
          />
        </div>
      </div>
    );
  }
}

BookingWrapper.propTypes = {
  onRequestClose: PropTypes.func,
  dataInfo: PropTypes.object
};

export default BookingWrapper;
