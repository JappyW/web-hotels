import React from "react";
import PropTypes from "prop-types";
import FilterResults from "react-filter-search";
import {
  FaInfoCircle,
  FaMapMarkerAlt,
  FaBed,
  FaRegCalendarAlt
} from "react-icons/fa";
import StarRatingsComponent from "react-star-rating-component";
import { STAR_RATING_COLOR, STAR_NUMBER,PAID, CURRENCY } from "../../constants/actionTypes";
import { DEFAULT_STUDIO_URL } from "../../constants";
import { getMainPhotoUrl } from "../../helpers";
import "./UserOrders.scss";

class ListOfOtherUserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.requestOrders = this.requestOrders.bind(this);
    this.state = {
      value: ""
    };
  }

  componentDidMount() {
    this.requestOrders();
  }

  async requestOrders() {
    if (this.props.requestedOrders == PAID) {
      await this.props.requestUserCabinetPaidOrders(this.props.user.email);
    } else {
      await this.props.requestUserCabinetCompletedOrders(this.props.user.email);
    }
  }

  handleSearchChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div id='accordion' className='list-studios w-100'>
        {this.props.orders ? (
          <div>
            <input
              className='form-control mb-3'
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
                              <span className=' order-date'>
                                {order.startDate + " - " + order.finishDate}
                              </span>
                            </button>
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

ListOfOtherUserOrders.propTypes = {
  requestUserCabinetPaidOrders: PropTypes.func,
  requestUserCabinetCompletedOrders: PropTypes.func,
  orders: PropTypes.array,
  user: PropTypes.object,
  requestedOrders: PropTypes.any
};

export default ListOfOtherUserOrders;
