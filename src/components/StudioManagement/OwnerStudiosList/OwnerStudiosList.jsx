import React, { Component, Fragment } from 'react';
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import './ownerStudiosList.scss';
import { STUDIO_MANAGEMENT_MESSAGES } from '../../../constants/messages';
import { STUDIO_STATUS } from '../../../constants/EnumForStudioStatus';

class OwnerStudiosList extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    getListOwnerStudios: PropTypes.func,
    ownerStudios: PropTypes.array
  }

  static defaultProps = {
    ownerStudios: []
  }

  constructor(props) {
    super(props);
    this.state = { ownerStudios: [] }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      ownerStudios: nextProps.ownerStudios
    };
  }


  handleManageStudioButtonClick = (event) => {
    const studioIndex = event.target.value;
    this.props.onClick({
      selectedStudioId: this.state.ownerStudios[studioIndex].id,
      subPage: event.target.name
    })
  }

  convertAddressToString = ({ city = '', street = '', house = '' }) => {
    const fullAddress = [city, street, house];
    return fullAddress.join(', ');
  }

  convertStudioStatusToString = (status = "") => {
    return STUDIO_STATUS.hasOwnProperty(status) ? STUDIO_STATUS[status] : "";
  }

  renderTableOwnerStudios = () => {
    return (
      <Fragment>
        <table className="table table-bordered owner-studios-list mt-3">
          <thead className="thead-owner-studios">
            <tr>
              <th scope="col" className="text-center">#</th>
              <th scope="col" className="text-center">{i18n.t("OWNER_STUDIOS_LIST_COLUMNS.STUDIO")}</th>
              <th scope="col" className="text-center">{i18n.t("OWNER_STUDIOS_LIST_COLUMNS.ADDRESS")}</th>
              <th scope="col" className="text-center">{i18n.t("OWNER_STUDIOS_LIST_COLUMNS.STATUS")}</th>
              <th scope="col" className="text-center">{i18n.t("OWNER_STUDIOS_LIST_COLUMNS.ROOM_DETAILS")}</th>
              <th scope="col" className="text-center">{i18n.t("OWNER_STUDIOS_LIST_COLUMNS.ADD_PHOTOS")}</th>
            </tr>
          </thead>
          <tbody>
            {(!!this.state.ownerStudios.length && this.state.ownerStudios.map((studio, index) => (
              <tr key={studio.name + studio.id}>
                <td scope="row" className="td-owner-studio text-center">{index + 1}</td>
                <td className="td-owner-studio">{studio.name}</td>
                <td className="td-owner-studio">
                  {this.convertAddressToString(studio.address)}
                </td>
                <td className="td-owner-studio text-center">
                  {this.convertStudioStatusToString(studio.status)}
                </td>
                <td className="td-owner-studio text-center">
                  <button className="btn btn-secondary"
                    onClick={this.handleManageStudioButtonClick} value={index} name="Rooms">
                    {i18n.t("STUDIO_MANAGEMENT.ROOMS")} <span className="badge badge-light">{studio.rooms.length}</span>
                  </button>
                </td>
                <td className="td-owner-studio  text-center">
                  <button className="btn btn-secondary"
                    onClick={this.handleManageStudioButtonClick} value={index} name="Photos">
                    {i18n.t("STUDIO_MANAGEMENT.PHOTOS")} <span className="badge badge-light">{studio.photos.length}</span>
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </Fragment>
    );
  }

  render() {
    return (
      <>
        {this.renderTableOwnerStudios()}
        {!this.state.ownerStudios.length && (
          <div className="alert alert-secondary mt-1" role="alert">
            {STUDIO_MANAGEMENT_MESSAGES.NO_OWNER_STUDIOS}
          </div>
        )}
      </>
    )
  }
}

export default withTranslation()(OwnerStudiosList);
