import React from "react";
import Button from "../reusableComponents/Button";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./search.scss";
import * as helpers from "../../helpers";
import PropTypes from "prop-types";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import Modal from "react-modal";
import { FaMusic } from "react-icons/fa";

const searchEventGenerators = {
  INPUT_SEARCH_STRING: "inputSearchString",
  INPUT_SEARCH_TIP: "inputSearchTip",
  INPUT_ROOM_TYPE: "inputRoomType",
  START_DATE: "startDate",
  FINISH_DATE: "finishDate",
  CLEAR_BUTTON: "clearButton",
  SEARCH_BUTTON: "searchButton",
};

const roomTypes = ["Any", "Bedroom Studio", "Dedicated Home Studio", "Deluxe Studio", "Semi-Pro Studio", "Pro Studio"];

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      RoomType: "Any",
      minimalFinishDate: helpers.createDateFromNow(1),
      showTips: false,
      modalIsOpen: false,
      song: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTips !== prevProps.searchTips) {
      if (this.props.searchTips[0].name !== undefined)
        this.setState({ showTips: true });
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
        {
          const { searchTips } = this.props;
          this.props.inputSearchString({
            [searchEventGenerators.INPUT_SEARCH_STRING]: searchTips[0].name,
          });
          this.setState({ searchString: searchTips[0].name, showTips: false });
        }
        break;
    }
  }

  handleTipsClick(event) {
    this.props.inputSearchString({
      [searchEventGenerators.INPUT_SEARCH_STRING]: event.target.value,
    });
    this.setState({ searchString: event.target.value, showTips: false });
  }

  handleTipsKeyDown(event) {
    if (event.key == "Enter") {
      this.props.inputSearchString({
        [searchEventGenerators.INPUT_SEARCH_STRING]: event.target.value,
      });
      this.setState({ searchString: event.target.value, showTips: false });
    }
  }

  handleSearchInput(event) {
    const inputValue = event.target.value;
    const targetName = event.target.name;

    switch (targetName) {
      case searchEventGenerators.INPUT_SEARCH_STRING:
        this.props.inputSearchString({ [targetName]: inputValue });
        this.setState({ searchString: inputValue });
        if (inputValue !== "") {
          this.setState({ showTips: false });
          this.props.requestSearchTips(inputValue);
        }
        break;
      case searchEventGenerators.INPUT_SEARCH_TIP:
        this.props.inputSearchString({
          [searchEventGenerators.INPUT_SEARCH_STRING]: inputValue,
        });
        this.setState({ searchString: inputValue, showTips: false });
        break;
      case searchEventGenerators.INPUT_ROOM_TYPE:
        this.props.inputRoomType({ [targetName]: inputValue });
        this.setState({ RoomType: inputValue });
        break;
      case searchEventGenerators.START_DATE:
        this.setState({
          startDate: inputValue,
          minimalFinishDate: inputValue,
        });
        this.props.selectStartDate({ [targetName]: inputValue });
        break;
      case searchEventGenerators.FINISH_DATE:
        this.setState({ finishDate: inputValue });
        this.props.selectFinishDate({
          [targetName]: inputValue,
        });
        break;
      case searchEventGenerators.CLEAR_BUTTON:
        this.setState({ searchString: "", showTips: false });
        this.props.clearSearchInputs();
        this.resetMusic();
        break;
      case searchEventGenerators.SEARCH_BUTTON: {
        event.preventDefault();
        let setOfInstruments = new Set();
        this.state.song.map(song => {
          setOfInstruments.add(song.instrumentName)
        });
        this.props.requestSearchStudios({
          searchData: this.props.searchData,
          currentPage: this.props.currentPage,
          amenities: Array.from(setOfInstruments)
        });
        break;
      }
    }
  }

  openMusicModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  handleClose = () => {
    this.props.setSong(this.state.song);
    this.setState({
      modalIsOpen: false,
    });
  };

  getStateToBubbleUp(note, instrument, name, time) {
    let arrayOfNotes = this.state.song;
    arrayOfNotes.push({ note, instrument, instrumentName: name, time });
    this.setState({ song: arrayOfNotes });
  }

  resetMusic = () => {
    this.setState({ song: [] });
  };

  render() {
    const { searchTips } = this.props;
    return (
      <div className="gradient-wrapper">
        <div className="container search-container">
          <form>
            <div className="d-flex  justify-content-lg-between search-box">
              <div className="input-group">
                <div>
                  <input
                    className="form-control search-input "
                    type="search"
                    autoComplete="off"
                    placeholder={i18n.t("SEARCH.ENTER CITY/STUDIO NAME")}
                    aria-label="Search"
                    title={i18n.t("SEARCH.ENTER PART OF CITY/STUDIO NAME")}
                    value={this.state.searchString}
                    name={searchEventGenerators.INPUT_SEARCH_STRING}
                    onChange={(event) => this.handleSearchInput(event)}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  {!!this.state.showTips && (
                    <select
                      size={searchTips.length}
                      className="form-control search-tips-select"
                      title="Stips"
                      name={searchEventGenerators.INPUT_SEARCH_TIP}
                      onClick={(event) => this.handleSearchInput(event)}
                      onChange={(event) => this.handleSearchInput(event)}
                    >
                      {searchTips.map((searchTip) => (
                        <option key={Math.floor(Math.random() * 10000)}>
                          {searchTip.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <input
                    className="form-control search-data-picker"
                    type="date"
                    title={i18n.t("SEARCH.CHECK-IN")}
                    min={helpers.createDateFromNow(0)}
                    name={searchEventGenerators.START_DATE}
                    onChange={(event) => this.handleSearchInput(event)}
                  />
                </div>
                <div>
                  <input
                    className="form-control search-data-picker"
                    type="date"
                    title={i18n.t("SEARCH.CHECK-OUT")}
                    min={this.state.minimalFinishDate}
                    name={searchEventGenerators.FINISH_DATE}
                    onChange={(event) => this.handleSearchInput(event)}
                  />
                </div>
                <div>
                  <select
                    className="form-control search-select"
                    title={i18n.t("SEARCH.ROOM TYPE")}
                    name={searchEventGenerators.INPUT_ROOM_TYPE}
                    onChange={(event) => this.handleSearchInput(event)}
                    value={this.state.RoomType}
                  >
                    {roomTypes.map((roomType) => (
                      <option key={Math.floor(Math.random() * 10000)}>
                        {roomType}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={this.openMusicModal}
                    className="btn ch-btn-primary activate-btn "
                  >
                    <FaMusic />
                  </button>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleClose}
                    className="confirmation-modal-styling"
                    shouldCloseOnOverlayClick={true}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Music Player</h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={this.handleClose}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body-music">
                          <MusicPlayer
                            getStateToBubbleUp={this.getStateToBubbleUp.bind(
                              this
                            )}
                            resetMusic={this.resetMusic}
                            song={this.state.song}
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn ch-btn-primary"
                            data-dismiss="modal"
                            aria-label="Save"
                            onClick={this.handleClose}
                          >{i18n.t("SEARCH.SAVE")}</button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div>
                  <Button
                    name={searchEventGenerators.CLEAR_BUTTON}
                    className="btn ch-btn-danger ml-2"
                    type="reset"
                    title={i18n.t("SEARCH.CLEAR ALL SEARCH INPUTS")}
                    label="X"
                    handleClick={(event) => this.handleSearchInput(event)}
                  />
                </div>
              </div>
              <div>
                <Button
                  name={searchEventGenerators.SEARCH_BUTTON}
                  className="btn ch-btn-primary mr-3"
                  type="submit"
                  title={i18n.t("SEARCH.Search Studios")}
                  label={i18n.t("SEARCH.SEARCH")}
                  handleClick={(event) => this.handleSearchInput(event)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  inputSearchString: PropTypes.func,
  inputRoomType: PropTypes.func,
  selectStartDate: PropTypes.func,
  selectFinishDate: PropTypes.func,
  requestSearchStudios: PropTypes.func,
  handleClick: PropTypes.func,
  clearSearchInputs: PropTypes.func,
  searchData: PropTypes.object,
  currentPage: PropTypes.any,
};

export default withTranslation()(Search);
