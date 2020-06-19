import React, { Component } from "react";
import PropTypes from "prop-types";
import "./feedbacks.scss";
import Button from "../reusableComponents/Button";
import { AlertMessage } from "../reusableComponents/AlertMessage/AlertMessage.jsx";
import * as helpers from "../../helpers";
import { isDateNegative } from "../../helpers";
import { USERPROFILE } from "../../constants/authActionTypes";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

const feedbacksEventGenerators = {
  ORDER_SELECT: "orderSelect",
  MESSAGE: "message",
  RATING: "rating"
};

export class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserStarRating: null,
      orderId: "",
      isFeedbackLeft: false,
      allRequiredFieldsPresent: false
    };
  }
  componentDidMount() {
    if (!!this.props.user.id) {
      this.props.requestUserOrders(this.props.user.id);
      this.props.requestUserFeedbacks(this.props.user.id);
    }
  }

  handleFeedbackInput(event) {
    this.setState({ allRequiredFieldsPresent: false });
    switch (event.target.name) {
      case feedbacksEventGenerators.ORDER_SELECT:
        this.props.feedbackData.order_id = event.target.value;
        this.setState({ orderId: event.target.value });
        break;
      case feedbacksEventGenerators.MESSAGE:
        this.props.feedbackData.message = event.target.value;
        break;
      case feedbacksEventGenerators.RATING:
        this.props.feedbackData.star = event.target.value;
        this.setState({ UserStarRating: event.target.title });
        break;
    }
  }

  handlePostFeedback = () => {
    event.preventDefault();
    if (
      !!this.props.feedbackData.star &&
      !!this.props.feedbackData.message &&
      !!this.props.feedbackData.order_id
    ) {
      this.props.requestPOSTFeedback({
        star: this.props.feedbackData.star,
        message: this.props.feedbackData.message,
        created_at: helpers.createDateFromNow(0),
        approved: false,
        order_id: this.props.feedbackData.order_id,
        user_id: this.props.user.id
      });

      this.setState({ isFeedbackLeft: true });
      this.setState({ allRequiredFieldsPresent: false });
    } else {
      this.setState({ allRequiredFieldsPresent: true });
    }
  };

  render() {
    const { userOrders } = this.props;
    //filter all orders, which start date has come
    const FilteredOrders = userOrders.filter(element =>
      isDateNegative(helpers.createDateFromNow(0), element.start_date)
    );

    return (
      <div>
        {" "}
        {!FilteredOrders[0] ? (
          <div className="feedback-container">
            <h5>
              <span className="">
                {i18n.t("FEEDBACKS.NO_ORDERS_WITHOUT_FEEDBACKS")}
              </span>
            </h5>

            <Button
              handleClick={() => this.props.showMyComponent(USERPROFILE)}
              name="closeButton"
              className="btn btn-primary center mt-2 "
              label={i18n.t("CLOSE")}
            />
          </div>
        ) : (
          <div>
            {!FilteredOrders[0].room ? (
              <h4>
                <span className="">{i18n.t("FEEDBACKS.LOADING")}</span>
              </h4>
            ) : (
              <div className="container feedback-container ">
                <form>
                  <div>
                    <div className="feedbacks_label">
                      {i18n.t("FEEDBACKS.LABELS.ORDERS")}
                    </div>
                    <select
                      value={this.state.orderId}
                      onChange={event => this.handleFeedbackInput(event)}
                      name={feedbacksEventGenerators.ORDER_SELECT}
                      className="orderSelect"
                    >
                      <option> {i18n.t("FEEDBACKS.LABELS.CHOOSE")}</option>
                      {FilteredOrders.map(h => (
                        <option
                          key={Math.floor(Math.random() * 10000)}
                          value={h.id}
                        >
                          {h.room.studio.name} / {h.start_date} — {h.finish_date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <div className="feedbacks_label">
                      {i18n.t("FEEDBACKS.LABELS.RATE_THE_STUDIO")}{" "}
                      {!this.state.UserStarRating ? (
                        <span></span>
                      ) : (
                        <span className="UserStarRating">
                          {this.state.UserStarRating}
                        </span>
                      )}
                    </div>
                    <div className="starrating d-flex justify-content-end flex-row-reverse">
                      <input
                        title={i18n.t("FEEDBACKS.RATING.EXCELENT")}
                        onChange={event => this.handleFeedbackInput(event)}
                        type="radio"
                        id="star5"
                        name={feedbacksEventGenerators.RATING}
                        value="5"
                      />
                      <label htmlFor="star5"></label>
                      <input
                        title={i18n.t("FEEDBACKS.RATING.VERY_GOOD")}
                        onChange={event => this.handleFeedbackInput(event)}
                        type="radio"
                        id="star4"
                        name={feedbacksEventGenerators.RATING}
                        value="4"
                      />
                      <label htmlFor="star4"></label>
                      <input
                        title={i18n.t("FEEDBACKS.RATING.AVERAGE")}
                        onChange={event => this.handleFeedbackInput(event)}
                        type="radio"
                        id="star3"
                        name={feedbacksEventGenerators.RATING}
                        value="3"
                      />
                      <label htmlFor="star3"></label>
                      <input
                        title={i18n.t("FEEDBACKS.RATING.POOR")}
                        onChange={event => this.handleFeedbackInput(event)}
                        type="radio"
                        id="star2"
                        name={feedbacksEventGenerators.RATING}
                        value="2"
                      />
                      <label htmlFor="star2"></label>
                      <input
                        title={i18n.t("FEEDBACKS.RATING.TERRIBLE")}
                        onChange={event => this.handleFeedbackInput(event)}
                        type="radio"
                        id="star1"
                        name={feedbacksEventGenerators.RATING}
                        value="1"
                      />
                      <label htmlFor="star1"></label>
                    </div>
                  </div>
                  <div className="">
                    <div className="feedbacks_label">
                      {i18n.t("FEEDBACKS.LABELS.FEEDBACK_TEXT")}
                      <textarea
                        className="feedback-textarea container"
                        rows="3"
                        type="text"
                        placeholder=""
                        aria-label="message"
                        title="message"
                        name={feedbacksEventGenerators.MESSAGE}
                        onChange={event => this.handleFeedbackInput(event)}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-around">
                    <Button
                      name="submitButton"
                      className="btn feedback-btn ch-btn-primary mt-3"
                      type="submit"
                      title="submit"
                      label={i18n.t("FEEDBACKS.LABELS.LEAVE_FEEDBACK")}
                      handleClick={this.handlePostFeedback}
                    />
                    <Button
                      handleClick={() =>
                        this.props.showMyComponent(USERPROFILE)
                      }
                      name="closeButton"
                      className="btn feedback-btn ch-btn-danger mt-3"
                      label={i18n.t("CANCEL")}
                    />
                  </div>

                  <div className="infoMessages text-center pt-2">
                    {this.state.allRequiredFieldsPresent && (
                      <AlertMessage
                        alertStyle="alert-warning"
                        message={i18n.t("FEEDBACKS.TO_LEAVE_FEEDBACK")}
                      />
                    )}
                    {this.state.isFeedbackLeft && (
                      <div className="container feedback-container text-center ">
                        <h5>
                          <span className="">
                            {i18n.t("FEEDBACKS.SUCCESS_MESSAGE")}
                          </span>
                        </h5>

                        <Button
                          handleClick={() =>
                            this.props.showMyComponent(USERPROFILE)
                          }
                          name="closeButton"
                          className="btn btn-primary center mt-2 "
                          label={i18n.t("CLOSE")}
                        />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Feedbacks.propTypes = {
  requestUserOrders: PropTypes.func,
  handleFeedbackInput: PropTypes.func
};

export default withTranslation()(Feedbacks);
