import React from "react";
import { DatePick } from "../reusableComponents/DatePicker/DatePick.jsx";
import { RoomPick } from "../reusableComponents/RoomPicker/RoomPick.jsx";
import Button from "../reusableComponents/Button";
import { AlertMessage } from "../reusableComponents/AlertMessage/AlertMessage.jsx";
import { isDateNegative, createDateFromNow } from "../../helpers";
import { OrderInfo } from "../reusableComponents/OrderInfo/OrderInfo.jsx";
import { exportMessages } from "../../constants/";
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

class BookForm extends React.Component {
  static propTypes = {
    clearPostResult: PropTypes.func,
    formValues: PropTypes.object,
    sendError: PropTypes.func,
    checkAvailability: PropTypes.func,
    infoValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    roomTypes: PropTypes.array,
    postResult: PropTypes.object,
    closeModal: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.clearPostResult();
  }

  bookRoom() {
    const startDate = this.props.formValues.startDate;
    const finishDate = this.props.formValues.finishDate;
    isDateNegative(startDate, finishDate)
      ? this.props.sendError(exportMessages.DATE_DIFFENCE_ERROR)
      : this.props.checkAvailability(
        Object.assign(this.props.formValues, this.props.infoValues, {song: this.props.song})
      );
  }

  render() {
    const {
      handleSubmit,
      roomTypes,
      postResult,
      closeModal,
      formValues,
      infoValues
    } = this.props;
    return (
      <div className="booking-view">
        <OrderInfo
          order={Object.assign(
            formValues,
            { Studio: infoValues.studioName },
            { City: infoValues.city }
          )}
          label={i18n.t('YOUR ORDER IS')}
        />
        <form
          className="form-group"
          onSubmit={handleSubmit(() => this.bookRoom())}
        >
          <RoomPick
            name="roomType"
            roomTypes={roomTypes}
            label={i18n.t('SELECT ROOM TYPE')}
          />
          <DatePick
            name="startDate"
            label={i18n.t('DATE TO ARRIVE')}
            min={createDateFromNow(1)}
          />
          <DatePick
            name="finishDate"
            label={i18n.t('DATE TO LEAVE')}
            min={createDateFromNow(2)}
          />
          <div className="infoMessages py-2">
            {!!postResult.error && (
              <AlertMessage
                alertStyle="alert-danger"
                message={postResult.error}
              />
            )}
            {!!postResult.success && (
              <AlertMessage
                alertStyle="alert-success"
                message={postResult.success}
              />
            )}
          </div>
          <div className="d-flex justify-content-around">
            <Button
              name="confirm"
              type="submit"
              className="btn ch-btn-success w-45"
              label={i18n.t('CONFIRM')}
            />
            <Button
              name="close"
              type="button"
              className="btn ch-btn-danger w-45"
              handleClick={closeModal}
              label={i18n.t('CLOSE')}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(BookForm);
