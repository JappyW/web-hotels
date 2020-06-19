import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import {
  STAR_RATING_COLOR,
  STAR_RATING_DIMENSION,
  STAR_NUMBER,
} from "../../constants/actionTypes";
import Button from "../reusableComponents/Button";
import { getMainPhotoUrl } from "../../helpers";
import { DEFAULT_STUDIO_IMAGE } from "../../constants";
import Modal from "react-modal";
import BookingWrapper from "../BookingForm/BookingWrapper.jsx";
import i18n from "i18next";

const StudioCard = (props) => {
  return (
    <div className="studio-card-box position-relative">
      <img
        className="studio-main-img w-100"
        src={
          props.studio.photos[0] !== undefined
            ? getMainPhotoUrl(props.studio.photos)
            : DEFAULT_STUDIO_IMAGE
        }
        alt={props.studio.name}
      ></img>
      <div
        className="studio-card-info position-absolute w-100 h-100 text-center
                    		d-flex-column-between"
      >
        <div className="studio-title w-100 p-3">
          <h4 className="studio-card-title m-0 text-uppercase">
            {props.studio.name}
          </h4>
          <StarRatings
            rating={props.studio.starRating}
            starRatedColor={STAR_RATING_COLOR}
            numberOfStars={STAR_NUMBER}
            starDimension={STAR_RATING_DIMENSION}
            name="rating"
          />
        </div>
        <Button
          type="submit"
          label={
            <Link className="" to={`/studios/${props.studio.id}`}>
              More info
            </Link>
          }
          className="btn btn-outline-light opacity studio-btn"
        />
        {props.info.authTrue ? (
          <Button
            type="submit"
            label={i18n.t("Book the room")}
            className="btn ch-btn-book p-4  mb-4 opacity"
            handleClick={props.info.toggleModal}
          />
        ) : null}

        <Modal
          isOpen={props.info.modal}
          onRequestClose={props.info.toggleModal}
          className="modal-styling"
        >
          <BookingWrapper
            onRequestClose={props.info.toggleModal}
            dataInfo={props.studio}
          />
        </Modal>

        <h3 className="studio-card-adrress w-100 m-0 p-3 text-uppercase">
          {props.studio.address.city}
        </h3>
      </div>
    </div>
  );
};

StudioCard.propTypes = {
  studio: PropTypes.object,
  info: PropTypes.object,
};

export default StudioCard;
