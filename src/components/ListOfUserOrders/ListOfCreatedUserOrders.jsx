import React from "react";
import PropTypes from "prop-types";
import Button from "../reusableComponents/Button";
import FilterResults from "react-filter-search";
import {
  FaInfoCircle,
  FaMapMarkerAlt,
  FaBed,
  FaRegCalendarAlt
} from "react-icons/fa";
import StarRatingsComponent from "react-star-rating-component";
import {
  STAR_RATING_COLOR,
  STAR_NUMBER,
  PAY,
  CURRENCY
} from "../../constants/actionTypes";
import { DEFAULT_STUDIO_URL } from "../../constants";
import { getMainPhotoUrl } from "../../helpers";
import CreditCardModal from "../../containers/CreditCardModal";
import "./UserOrders.scss";

class ListOfCreatedUserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.requestOrders = this.requestOrders.bind(this);
    this.payForOrder = this.payForOrder.bind(this);
    this.openCreditCardModal = this.openCreditCardModal.bind(this);
    this.onPaymentSubmit = this.onPaymentSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getPriceForSeveralDays = this.getPriceForSeveralDays.bind(this);
    this.state = {
      value: "",
      creditCardModalIsOpen: false
    };
  }

  componentDidMount() {
    this.requestOrders();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        error: newProps.errorMessage
      });
    }
  }

  async requestOrders() {
    await this.props.requestUserCabinetCreatedOrders(this.props.user.email);
  }

  async payForOrder(data) {
    await this.props.requestPayForOrder(data);
    setTimeout(() => {
      if (!this.state.error) {
        setTimeout(() => {
          this.handleClose();
          this.requestOrders();
        }, 1000);
      }
    }, 3000);
  }

  handleSearchChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  openCreditCardModal = id => {
    this.setState(
      {
        creditCardModalIsOpen: true,
        orderId: id
      },
      () => {}
    );
  };

  handleClose() {
    this.setState({ creditCardModalIsOpen: false });
  }

  async onPaymentSubmit(formData) {
    formData.orderId = this.state.orderId;
    const expiry = formData.expiry.split("/");
    const orderData = {
      card: formData.number,
      name: formData.name,
      expiryMonth: expiry[0],
      expiryYear: expiry[1],
      cvc: formData.cvc,
      orderId: formData.orderId
    };
    await this.payForOrder(orderData);
  }

  getPriceForSeveralDays(order) {
    const miliseconds = Math.abs(
      new Date(order.finishDate) - new Date(order.startDate)
    );
    const days = parseInt(Math.floor(miliseconds / 3600000 / 24));
    const price = order.room.price * days;
    return price;
  }

  render() {
    const { value } = this.state;
    return (
      <div id='accordion' className='list-studios w-100'>
        {this.props.orders ? (
          <div>
            <CreditCardModal
              modalIsOpen={this.state.creditCardModalIsOpen}
              title='Pay for order'
              handleClose={this.handleClose}
              onPaymentSubmit={this.onPaymentSubmit}></CreditCardModal>
            <input
              className='form-control orders-search mb-3'
              placeholder='Search...'
              type='text'
              value={value}
              onChange={this.handleSearchChange}
            />
            <FilterResults
              value={value}
              data={this.props.orders}
              renderResults={results => (
                <div>
                  {results.length > 0 ? (
                    <div className='orders-exist'>
                      {results.map(order => (
                        <div key={order.id} className='card'>
                          <div
                            className='card-header d-flex justify-content-between align-items-center'
                            id='headingOne'>
                            <button
                              className='btn btn-link text-btn'
                              data-toggle='collapse'
                              data-target={`#collapse${order.id}`}
                              aria-expanded='true'
                              aria-controls={`collapse${order.id}`}>
                              <span className='mr-1 icon'>
                                <FaInfoCircle />
                              </span>
                              <span className='mr-4 order-name'>
                                {order.room.studio.name}
                              </span>
                              <span className='order-date'>
                                {order.startDate + " - " + order.finishDate}
                              </span>
                            </button>
                            <div className='btn-header'>
                              <Button
                                type='button'
                                label={
                                  PAY +
                                  " " +
                                  this.getPriceForSeveralDays(order) +
                                  CURRENCY
                                }
                                handleClick={() =>
                                  this.openCreditCardModal(order.id)
                                }
                                className='btn ch-btn-primary activate-btn '
                              />
                            </div>
                          </div>
                          <div
                            id={`collapse${order.id}`}
                            className='collapse'
                            aria-labelledby='headingOne'
                            data-parent='#accordion'>
                            <div className='card-body d-flex'>
                              <img
                                className='img-info-sm'
                                src={
                                  order.room.studio.photos[0] !== undefined
                                    ? getMainPhotoUrl(order.room.studio.photos)
                                    : DEFAULT_STUDIO_URL
                                }
                                alt={order.room.studio.name}
                              />
                              <div className='d-flex flex-column flex-grow-1 justify-content-between'>
                                <div className='content'>
                                  <h3>
                                    <span className='mr-1'>
                                      {order.room.studio.name}
                                    </span>
                                    <sup>
                                      <StarRatingsComponent
                                        editing={false}
                                        value={order.room.studio.starRating}
                                        starColor={STAR_RATING_COLOR}
                                        starRating={STAR_NUMBER}
                                        name='rating'
                                      />
                                    </sup>
                                  </h3>
                                  <h6>
                                    <span className='mr-1 ico-map'>
                                      <FaMapMarkerAlt />
                                    </span>
                                    <span>
                                      {order.room.studio.address.city +
                                        ", " +
                                        order.room.studio.address.street +
                                        ", " +
                                        order.room.studio.address.house}
                                    </span>
                                  </h6>
                                  <h6>
                                    <span className='mr-1'>
                                      <FaBed />
                                    </span>
                                    <span>
                                      {order.room.room_type.name +
                                        " - " +
                                        order.room.price +
                                        CURRENCY}
                                    </span>
                                  </h6>
                                  <h6>
                                    <span className='mr-1'>
                                      <FaRegCalendarAlt />
                                    </span>
                                    <span>
                                      {order.startDate +
                                        " - " +
                                        order.finishDate}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='container text-center items-do-not-exist'>
                      Nothing is found
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ListOfCreatedUserOrders.propTypes = {
  requestUserCabinetCreatedOrders: PropTypes.func,
  requestPayForOrder: PropTypes.func,
  orders: PropTypes.array,
  user: PropTypes.object
};

export default ListOfCreatedUserOrders;
