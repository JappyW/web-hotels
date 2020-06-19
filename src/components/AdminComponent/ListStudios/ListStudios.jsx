
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FilterResults from "react-filter-search";
import StarRatings from "react-star-ratings";
import {
  FaAngleUp,
  FaMapMarkerAlt,
  FaUserTie,
  FaEnvelope
} from "react-icons/fa";
import Button from "../../reusableComponents/Button";
import {
  STAR_RATING_COLOR,
  STAR_RATING_DIMENSION,
  STAR_NUMBER,
  STATUS_STUDIOS
} from "../../../constants/actionTypes";
import { DEFAULT_STUDIO_IMAGE, FULLNAME_INCOGNITO } from "../../../constants";
import { MODAL_BUTTON, MODAL_BUTTON_KIND } from "../../../constants/buttons";
import {
  ConfirmationModal,
  MODAL_TITLE,
  MODAL_MESSAGE
} from "../../reusableComponents/ConfirmationModal/ConfirmationModal.jsx";
import Modal from "react-modal";
import SendOwnerMessage from "../../../containers/SendOwnerMessage";
import Spinner from "../../reusableComponents/Spinner";

export class ListStudios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalIsOpen: false,
      messageText: "",
      modalOpen: false,
      icon: false,
      value: ""
    };
    this.currentStudioId = 0;
    this.statusStudio = "";
    this.aiconClass = null;
    this.areThereBookedRooms = this.areThereBookedRooms.bind(this);
  }

  componentDidMount() {
    this.props.data();
  }

  areThereBookedRooms = rooms => {
    if (rooms) {
      if (rooms.length > 0) {
        rooms.map(room => {
          if (room.orders.length > 0) {
            return false;
          } else return true;
        });
      } else return true;
    } else return true;
  };

  openModal = (id, email) => {
    this.setState({ modalOpen: true, id, email });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, condition: !this.state.condition });
  };

  showClass = id => {
    this.setState({
      icon: !this.state.icon
    });
    this.iconClass = id;
  };

  onActivateStudioClick(currentStudioId, statusStudio, messageText) {
    this.setState({
      confirmationModalIsOpen: true,
      messageText: `${messageText}`
    });
    this.currentStudioId = currentStudioId;
    this.statusStudio = statusStudio;
  }

  handleConfirmModalResult = usersChoise => {
    this.setState({ confirmationModalIsOpen: false });
    if (usersChoise === MODAL_BUTTON.OK) {
      this.props.updateStatusStudio({
        id: this.currentStudioId,
        status: this.statusStudio
      });
    }
  };

  handleSearchChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="spinner-container">
          <Spinner />
        </div>
      );
    }

    const { value } = this.state;

    return (
      <div>
        <ConfirmationModal
          modalIsOpen={this.state.confirmationModalIsOpen}
          title={MODAL_TITLE.CONFIRMATION}
          message={MODAL_MESSAGE.CONFIRM_CHANGE + this.state.messageText}
          buttons={[
            { name: MODAL_BUTTON.OK, kind: MODAL_BUTTON_KIND.DANGER },
            { name: MODAL_BUTTON.CANCEL, kind: MODAL_BUTTON_KIND.SUCCESS }
          ]}
          onClose={this.handleConfirmModalResult}
        ></ConfirmationModal>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.state.closeModal}
          className="modal-send-mail"
        >
          <SendOwnerMessage
            email={this.state.email}
            closeModal={this.closeModal}
            id={this.state.id}
            status={STATUS_STUDIOS.SUSPEND}
            updateStatusStudio={this.props.updateStatusStudio}
          />
        </Modal>
        <div id="accordion" className="list-studios w-100 mt-3">
          <input
            placeholder="Search..."
            className="form-control mb-3 "
            type="text"
            value={value}
            onChange={this.handleSearchChange}
          />
          <FilterResults
            value={value}
            data={this.props.listStudio}
            renderResults={results => (
              <div>
                {results.length > 0 ? (
                  <div className="orders-exist">
                    {results.map(studio => {
                      return (
                        <div key={studio.id} className="card">
                          <div
                            className="card-header d-flex justify-content-between align-items-center"
                            id="headingOne"
                          >
                            <Button
                              className={`btn btn-link text-btn ${
                                this.state.icon && this.iconClass === studio.id
                                  ? `icon-down`
                                  : `icon-up`
                              }`}
                              dataToggle="collapse"
                              dataTarget={`#collapse${studio.id}`}
                              ariaExpanded="true"
                              ariaControls={`collapse${studio.id}`}
                              icoLeft={
                                <span className="d-inline-block fa-angle-ch">
                                  <FaAngleUp />
                                </span>
                              }
                              label={studio.name}
                              handleClick={() => this.showClass(studio.id)}
                            ></Button>
                            <div className="btn-header">
                              <Button
                                type="button"
                                label={
                                  <Link className="" to={`/studios/${studio.id}`}>
                                    More info
                                  </Link>
                                }
                                className="btn more-info-btn"
                              />
                              {(this.props.status === STATUS_STUDIOS.SUSPEND ||
                                this.props.status ===
                                  STATUS_STUDIOS.INACTIVE) && (
                                <Button
                                  type="button"
                                  label="activate studio"
                                  handleClick={this.onActivateStudioClick.bind(
                                    this,
                                    studio.id,
                                    STATUS_STUDIOS.ACTIVE,
                                    `activate ${studio.name}?`
                                  )}
                                  className="btn ch-btn-primary activate-btn"
                                />
                              )}
                              {this.props.status === STATUS_STUDIOS.ACTIVE && (
                                <Button
                                  type="button"
                                  label="Inactivate studio"
                                  handleClick={this.onActivateStudioClick.bind(
                                    this,
                                    studio.id,
                                    STATUS_STUDIOS.INACTIVE,
                                    `inactivate ${studio.name}?`
                                  )}
                                  className="btn ch-btn-danger activate-btn"
                                />
                              )}
                            </div>
                          </div>
                          <div
                            id={`collapse${studio.id}`}
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body d-flex">
                              <img
                                className="img-info-sm"
                                src={
                                  studio.photos[0] === undefined
                                    ? DEFAULT_STUDIO_IMAGE
                                    : studio.photos[0].photo_url
                                }
                                alt={studio.name}
                              />
                              <div className="d-flex flex-column flex-grow-1 justify-content-between info-studio-mobile">
                                <div className="content">
                                  <h3>
                                    {studio.name}
                                    <sup>
                                      <StarRatings
                                        rating={studio.starRating}
                                        starRatedColor={STAR_RATING_COLOR}
                                        numberOfStars={STAR_NUMBER}
                                        starDimension={STAR_RATING_DIMENSION}
                                        name="rating"
                                      />
                                    </sup>
                                  </h3>
                                  <h6>
                                    <span className="ico-map">
                                      <FaMapMarkerAlt />
                                    </span>
                                    &nbsp;
                                    {studio.address.city},&nbsp;
                                    {studio.address.street},&nbsp;
                                    {studio.address.house}
                                  </h6>
                                  <div>
                                    <h6 className="owner-info">Owner info:</h6>
                                    <span className="d-block">
                                      {studio.user.fullname !== null ? (
                                        <span>
                                          <i className="ico-fullname">
                                            <FaUserTie />
                                          </i>
                                          {studio.user.fullname}
                                        </span>
                                      ) : (
                                        <img
                                          className="incognito-img-sm"
                                          src={FULLNAME_INCOGNITO}
                                          alt="fullname incognito"
                                        />
                                      )}
                                    </span>
                                    <span>
                                      <i className="ico-email">
                                        <FaEnvelope />
                                      </i>
                                      {studio.user.email}
                                    </span>
                                  </div>
                                </div>
                                <div className="btn-body">
                                  {(this.props.status ===
                                    STATUS_STUDIOS.ACTIVE ||
                                    this.props.status ===
                                      STATUS_STUDIOS.INACTIVE) && (
                                    <Button
                                      type="button"
                                      label="suspend"
                                      handleClick={this.openModal.bind(
                                        this,
                                        studio.id,
                                        studio.user.email
                                      )}
                                      className="btn ch-btn-warning "
                                    />
                                  )}
                                  <Button
                                    type="button"
                                    label="reject"
                                    handleClick={this.onActivateStudioClick.bind(
                                      this,
                                      studio.id,
                                      STATUS_STUDIOS.REJECT,
                                      `reject ${studio.name}?`
                                    )}
                                    disabled={
                                      !this.areThereBookedRooms(studio.rooms)
                                    }
                                    className="btn ch-btn-danger ml-3"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="container text-center items-do-not-exist">
                    Nothing is found
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

ListStudios.propTypes = {
  listStudio: PropTypes.array,
  updateStatusStudio: PropTypes.func,
  status: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.func
};

export default withTranslation()(ListStudios);