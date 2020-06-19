import React from "react";
import PropTypes from "prop-types";
import ReactMobxMusic from "react-mobx-music";
import FilterResults from "react-filter-search";
import {
  FaInfoCircle,
  FaMapMarkerAlt,
  FaBed,
  FaRegCalendarAlt,
  FaPlay,
} from "react-icons/fa";
import StarRatingsComponent from "react-star-rating-component";
import {
  STAR_RATING_COLOR,
  STAR_NUMBER,
  PAID,
  CURRENCY,
} from "../../constants/actionTypes";
import { DEFAULT_STUDIO_URL } from "../../constants";
import { getMainPhotoUrl } from "../../helpers";
import "./UserOrders.scss";

class ListOfOwnerOrders extends React.Component {
  constructor(props) {
    super(props);
    this.requestOrders = this.requestOrders.bind(this);
    this.do_timeout = this.do_timeout.bind(this);
    this.getInstruments = this.getInstruments.bind(this);
    this.doAsync = this.doAsync.bind(this);
    this.state = {
      value: "",
      instrument: "acoustic_grand_piano",
    };
  }

  componentDidMount() {
    this.requestOrders();
  }

  async requestOrders() {
    await this.props.requestOwnerOrders(this.props.user.email);
  }

  handleSearchChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  playMusic(note, instruments) {
    const instrument = instruments.get(note.instrumentName);
    instrument.play(note.note, {
      duration: 1000,
    });
    setTimeout(() => {
      instrument.stop(note.note, {
        duration: 1000,
      });
    }, 1000);
  }

  async doAsync(song, instruments) {
    this.do_timeout(song, this.playMusic, 0, 0, instruments, this);
  }

  do_timeout(
    items = [],
    callback = () => {},
    delay = 50,
    index = 0,
    instruments,
    context
  ) {
    if (index < items.length) {
      window.setTimeout(function () {
        callback(items[index], instruments);

        context.do_timeout(
          items,
          callback,
          items[index].time,
          ++index,
          instruments,
          context
        );
      }, delay);
    }
  }

  getInstruments() {
    let setOfInstrumentNames = new Set();
    this.props.orders.map((order) => {
      order.song.map((song) => {
        setOfInstrumentNames.add(song.instrumentName);
      });
    });
    this.setState({ instrument: Array.from(setOfInstrumentNames) });
  }

  render() {
    const { value } = this.state;
    return (
      <div id="accordion" className="list-studios w-100">
        {this.props.orders ? (
          <div onLoad={this.getInstruments}>
            <input
              className="form-control mb-3"
              placeholder="Search..."
              type="text"
              value={value}
              onChange={this.handleSearchChange}
            />
            <FilterResults
              value={value}
              data={this.props.orders}
              renderResults={(results) => (
                <div>
                  {results.length > 0 ? (
                    <div className="orders-exist">
                      {results.map((order) => (
                        <div key={order.id} className="card">
                          <div
                            className="card-header d-flex justify-content-between align-items-center"
                            id="headingOne"
                          >
                            <button
                              className="btn btn-link text-btn"
                              data-toggle="collapse"
                              data-target={`#collapse${order.id}`}
                              aria-expanded="true"
                              aria-controls={`collapse${order.id}`}
                            >
                              <span className="mr-1 icon">
                                <FaInfoCircle />
                              </span>
                              <span className="mr-4 order-name">
                                {order.room.studio.name}
                              </span>
                              <span className=" order-date">
                                {order.startDate + " - " + order.finishDate}
                              </span>
                            </button>
                          </div>
                          <div
                            id={`collapse${order.id}`}
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body d-flex">
                              <img
                                className="img-info-sm"
                                src={
                                  order.room.studio.photos[0] !== undefined
                                    ? getMainPhotoUrl(order.room.studio.photos)
                                    : DEFAULT_STUDIO_URL
                                }
                                alt={order.room.studio.name}
                              />
                              <div className="d-flex flex-column flex-grow-1 justify-content-between">
                                <div className="content">
                                  <h3>
                                    <span className="mr-1">
                                      {order.room.studio.name}
                                    </span>
                                    <sup>
                                      <StarRatingsComponent
                                        editing={false}
                                        value={order.room.studio.starRating}
                                        starColor={STAR_RATING_COLOR}
                                        starRating={STAR_NUMBER}
                                        name="rating"
                                      />
                                    </sup>
                                  </h3>
                                  <h6>
                                    <span className="mr-1 ico-map">
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
                                    <span className="mr-1">
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
                                    <span className="mr-1">
                                      <FaRegCalendarAlt />
                                    </span>
                                    <span>
                                      {order.startDate +
                                        " - " +
                                        order.finishDate}
                                    </span>
                                    <div className="mt-2">
                                      <ReactMobxMusic
                                        instrumentNames={this.state.instrument}
                                      >
                                        {({ isLoading, instruments }) =>
                                          isLoading ? null : (
                                            <button
                                              onClick={() =>
                                                this.doAsync(
                                                  order.song,
                                                  instruments
                                                )
                                              }
                                              className="btn ch-btn-primary"
                                            >
                                              <FaPlay />
                                            </button>
                                          )
                                        }
                                      </ReactMobxMusic>
                                    </div>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
        ) : null}
      </div>
    );
  }
}

ListOfOwnerOrders.propTypes = {
  requestUserCabinetPaidOrders: PropTypes.func,
  requestUserCabinetCompletedOrders: PropTypes.func,
  orders: PropTypes.array,
  user: PropTypes.object,
  requestedOrders: PropTypes.any,
};

export default ListOfOwnerOrders;
