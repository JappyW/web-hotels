import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './manageStudioRooms.scss';
import { MANAGE_STUDIO_ROOMS_MESSAGES } from '../../constants/messages';
import i18n from "i18next";
import { withTranslation } from "react-i18next";

class ManageStudioRooms extends Component {
  static propTypes = {
    onLeaveManageStudioRooms: PropTypes.func,
    requestGetListRoomsInStudio: PropTypes.func,
    selectedStudioId: PropTypes.number,
    userId: PropTypes.number,
    selectedStudioRooms: PropTypes.array,
  }

  static defaultProps = {
    selectedStudioId: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedRoomId: 0,
      selectedRoomComforts: []
    }
  }

  onLeaveManageRooms = () => {
    this.props.onLeaveManageStudioRooms();
  }

  getUniqueKey = () => {
    return Math.random();
  }

  componentDidMount = () => {
    this.props.requestGetListRoomsInStudio(this.props.selectedStudioId);
  }

  renderRoomsList = () => {
    return (
      <Fragment>
        <div className="container">
          <table className="table table-bordered owner-studio-room-list mt-3">
            <thead className="thead-owner-studio-room-list">
              <tr>
                {/* <th scope="col" className="text-center">#</th> */}
                <th scope="col" className="text-center">{i18n.t("ROOM_LIST_COLUMNS.ROOM_NUMBER")}</th>
                <th scope="col" className="text-center">{i18n.t("ROOM_LIST_COLUMNS.ROOM_TYPE")}</th>
                <th scope="col" className="text-center">{i18n.t("ROOM_LIST_COLUMNS.COMRORTS")}</th>
              </tr>
            </thead>
            <tbody>
              {!!this.props.selectedStudioRooms.length && (
                (this.props.selectedStudioRooms.map((room, index) => (
                  <tr key={room.id}>
                    {/* <td scope="row" className="td-owner-studio-rooms-list text-center">{room.id}</td> */}
                    <td className="td-owner-studio-room-list">{room.roomNumber}</td>
                    <td className="td-owner-studio-room-list">{room.room_type.name}</td>
                    <td className="td-owner-studio-room-list">
                      <div key={this.getUniqueKey()} className="col-10">
                        {room.room_comforts.map((item) => (
                          <React.Fragment key={this.getUniqueKey()}>
                            <label key={this.getUniqueKey()} className="room-comfort-label ml-1">
                              <span key={this.getUniqueKey()} className="badge room-comfort-badge">{item.comfort.name}</span>
                            </label>
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))))}
            </tbody>
          </table>
          <div className="row m-0  justify-content-center">
            {!this.props.selectedStudioRooms.length && (
              <div className="alert alert-danger mt-1" role="alert">
                {MANAGE_STUDIO_ROOMS_MESSAGES.NO_ROOMS}
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <div className="row">
        {this.renderRoomsList()}
      </div>
    )
  }
}

export default withTranslation()(ManageStudioRooms);

