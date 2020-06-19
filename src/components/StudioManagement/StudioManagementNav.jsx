
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StudioManagementNav extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    subPathName: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <nav aria-label="breadcrumb ">
          <ol className="breadcrumb studio-management-navigation">
            <li className="breadcrumb-item studio-management-navigation-item">
              <a href="#" onClick={() => this.props.onClick()}>{i18n.t('STUDIO_MANAGEMENT.STUDIOS LIST')}</a>
            </li>
            {this.props.subPathName && (
              <li className="breadcrumb-item active" aria-current="page">
                {this.props.subPathName}
              </li>)
            }
          </ol>
        </nav>
      </>
    )
  }
}

export default withTranslation()(StudioManagementNav);
