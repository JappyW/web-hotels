import React, { Component} from "react";
import BookingWrapper from "../BookingForm/BookingWrapper.jsx";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { StudioCarousel } from "./StudioCarousel.jsx";
import  FeedbackSearch  from "../../containers/FeedbackSearch";
import Button from "../reusableComponents/Button";
import Map from "../reusableComponents/Map/Map.jsx";
import {STAR_NUMBER, STAR_RATING_COLOR, ZOOM} from "../../constants/actionTypes";
import i18n from 'i18next';
import { withTranslation  } from 'react-i18next';
import {FaMapMarkedAlt} from 'react-icons/fa';
import StarRatings from "react-star-ratings";
import {getMainPhotoUrl} from "../../helpers";
import {DEFAULT_STUDIO_URL} from "../../constants";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import StarRatingsComponent from "react-star-rating-component";
import {
    FaCameraRetro
  } from "react-icons/fa";


export class StudioDetails extends Component {
    constructor(props) {
        super(props);
    }

    onHandleChange(state){
        this.setState(state)
    }

    closeCarouselModal(){
        this.props.toggleModalCarousel();
    }

    closeFeedbackModal(){
        this.props.toggleModalFeedback();
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        this.props.requestGetStudioDetails(id);
    }

    renderStudioAddress(address) {
        return (
            <span className='m-0'>
                {address.street},{address.house},{address.city},{address.country}
            </span>
        );
    }

    render() {
        let coordinates = this.props.studios.address &&
            this.props.studios.address.latLong.split(',');
        return (
            <div>
                <ScrollUpButton  ContainerClassName='scroll-up-ch'/>
            {this.props.studios && this.props.photos && (
                <div className='studio-detail container-fluid'>
                    <div className='row' onClick={this.props.toggleModalCarousel}>
                        <img
                            className='studio-picture'
                            src={
                                this.props.studios.photos !== undefined
                                    ? getMainPhotoUrl(this.props.studios.photos)
                                    : DEFAULT_STUDIO_URL
                            }
                            alt={this.props.studios.name}
                        />
                        <div className="open-carousel">
                            <span><FaCameraRetro/></span>
                        </div>
                    </div>
                    <div className="row studio-info">
                        <div className="col-sm col-md-8 col-lg-8 studio-info-color p-5">
                            <div className="d-flex justify-content-between">
                                <h3 className="studio-name">
                                    {this.props.studios.name}
                                </h3>
                                { (this.props.authTrue)
                                    ? <Button
                                        type='submit'
                                        label={i18n.t('BOOK THE ROOM')}
                                        className ='ch-btn-main-color w-25 p-2 '
                                        handleClick={this.props.toggleModal}
                                    />
                                    : null
                                }
                                <Modal
                                    isOpen={this.props.modal}
                                    onRequestClose={this.props.toggleModal}
                                    className='modal-styling'
                                >
                                    <BookingWrapper
                                        onRequestClose={this.props.toggleModal}
                                        dataInfo={this.props.studios}
                                    />
                                </Modal>
                            </div>
                            <StarRatings
                                rating={this.props.studios.starRating}
                                starRatedColor={STAR_RATING_COLOR}
                                numberOfStars={STAR_NUMBER}
                                starDimension="22px"
                            />
                            <h5 className="m-2">
                                <FaMapMarkedAlt/>  {this.props.address &&
                                this.renderStudioAddress(this.props.address)}
                            </h5>
                            <hr/>
                            <p className="text-justify">{this.props.studios.description}</p>
                            <hr/>
                            {this.props.studios.address &&
                            (
                                <Map className="googleMap"
                                     key={this.props.studios.id}
                                     mapGetStateToParent={this.onHandleChange.bind(this)}
                                     mapState={this.state}
                                     google={this.props.google}
                                     center={{ lat: parseFloat(coordinates[0]),
                                               lng: parseFloat(coordinates[1]) }}
                                     height='250px'
                                     zoom={ZOOM}
                                     readOnly={false}
                                     autocomplete={false}
                                />
                            )}
                        </div>
                    </div>
                    <div className="row my-5">
                        {this.props.rooms &&  this.props.rooms.map((room,index) =>
                                <div className="col-6 card roomDetails align-items-center" key={Math.floor(Math.random()*1000000)}>
                                    <h2 className="mt-4 font-weight-bold">{room.room_type.name}</h2>
                                    <h3 className="mt-2 font-weight-bold">{room.price}₴</h3>
                                    <div className="card-body" >
                                        <ul className="card-text">  
                                            {room.room_comforts && room.room_comforts.map(comforts =>
                                                (<React.Fragment key={Math.floor(Math.random()*1000000)}>
                                                    <li className="comfort-list">{comforts.comfort.name}</li>
                                                </React.Fragment>)
                                            )}
                                        </ul>
                                    </div>

                                { (this.props.authTrue)
                                    ? <Button
                                        type='submit'
                                        label={i18n.t('BOOK THE ROOM')}
                                        className ='ch-btn-main-color py-2 px-4 my-3'
                                        handleClick={this.props.toggleModal}
                                    />
                                    : null
                                }
                                <Modal
                                    isOpen={this.props.modal}
                                    onRequestClose={this.props.toggleModal}
                                    className='modal-styling'
                                >
                                    <BookingWrapper
                                        onRequestClose={this.props.toggleModal}
                                        dataInfo={this.props.studios}
                                    />
                                </Modal>
                            </div>
                        )}

                        <div className="card col-6 w-23 align-items-center">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <p className="card-title reviewNumber my-0">
                                    {parseFloat(this.props.studios.reviewsRating).toFixed(1)}
                                </p>
                                <StarRatingsComponent
                                    editing={false}
                                    value={parseFloat(this.props.studios.reviewsRating).toFixed(1)}
                                    starColor={STAR_RATING_COLOR}
                                    starRating={STAR_NUMBER}
                                    name='rating'
                                />
                                <p className="">total reviews rating</p>
                                <Button
                                    type='redirect'
                                    label='View feedbacks'
                                    className ='ch-btn-black py-2 px-4 mt-3'
                                    handleClick={this.props.toggleModalFeedback}
                                />
                                <Modal
                                    isOpen={this.props.modalFeedback}
                                    onRequestClose={this.props.toggleModalFeedback}
                                    className="m-5 feedback-modal"
                                >
                                    <FeedbackSearch studioId={this.props.studios.id}
                                                    onRequestClose={this.closeFeedbackModal.bind(this)}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className='col carousel'>
                        <Modal
                            isOpen={this.props.modalCarousel}
                            className="carousel-modal"
                        >
                        {this.props.photos && this.props.studios.id && (
                            <StudioCarousel
                                key={this.props.studios.id}
                                images={this.props.photos}
                                onRequestClose={this.closeCarouselModal.bind(this)}
                            />
                        )}
                        </Modal>
                    </div>
                </div>
                )}
            </div>
        );
    }
}

StudioDetails.propTypes = {
    studios: PropTypes.object,
    rooms: PropTypes.array,
    photos: PropTypes.array,
    address: PropTypes.object,
    requestGetStudioDetails: PropTypes.func,
    requestGetFeedbackByStudioId: PropTypes.func,
    google: PropTypes.any,
    match: PropTypes.any,
    authTrue:  PropTypes.bool,
    toggleModal: PropTypes.any,
    modal: PropTypes.any,
    toggleModalCarousel: PropTypes.any,
    toggleModalFeedback: PropTypes.any,
    modalCarousel: PropTypes.any,
    modalFeedback: PropTypes.any,
    feedback: PropTypes.array,
    feedbackCount: PropTypes.any,
    countPage: PropTypes.any
};

export default withTranslation() (StudioDetails);
