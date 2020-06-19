import React from "react";
import PropTypes from "prop-types";
import ListStudios from "./ListStudios/ListStudios.jsx";
import { STATUS_STUDIOS } from "../../constants/actionTypes";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

export class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.showMyTab = this.showMyTab.bind(this);
    this.state = {
      component: STATUS_STUDIOS.INACTIVE
    };
  }

  showMyTab(component) {
    this.setState({
      component: component
    });
  }

  render() {
    return (
      <>
       <ScrollUpButton  ContainerClassName='scroll-up-ch'/>
      <div className="container-fluid">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link p-2 active"
              id="created-orders"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              onClick={() => this.showMyTab(STATUS_STUDIOS.INACTIVE)}
            >
              Inactive studios
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link p-2"
              id="paid-orders"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => this.showMyTab(STATUS_STUDIOS.ACTIVE)}
            >
              Active studios
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link p-2"
              id="completed-orders"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              onClick={() => this.showMyTab(STATUS_STUDIOS.SUSPEND)}
            >
              Suspend studios
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="created-orders"
          >
            {this.state.component == STATUS_STUDIOS.INACTIVE ? (
              <ListStudios
                status={STATUS_STUDIOS.INACTIVE}
                listStudio={this.props.notActiveStudios}
                updateStatusStudio={this.props.updateStatusStudio}
                loading={this.props.loading}
                data={this.props.inactiveStatusStudios}
              />
            ) : null}
            {this.state.component == STATUS_STUDIOS.ACTIVE ? (
              <ListStudios
                status={STATUS_STUDIOS.ACTIVE}
                listStudio={this.props.listActiveStudios}
                updateStatusStudio={this.props.updateStatusStudio}
                loading={this.props.loading}
                data={this.props.getListActiveHolels}
              />
            ) : null}
            {this.state.component == STATUS_STUDIOS.SUSPEND ? (
              <ListStudios
                status={STATUS_STUDIOS.SUSPEND}
                listStudio={this.props.listSuspendStudios}
                updateStatusStudio={this.props.updateStatusStudio}
                loading={this.props.loading}
                data={this.props.getListSuspendHolels}
              />
            ) : null}
          </div>
        </div>
      </div>
      </>
    );
  }
}

AdminComponent.propTypes = {
  inactiveStatusStudios: PropTypes.func,
  notActiveStudios: PropTypes.array,
  countNotActiveStudios: PropTypes.number,
  updateStatusStudio: PropTypes.func,
  listActiveStudios: PropTypes.array,
  getListActiveHolels: PropTypes.func,
  status: PropTypes.string,
  getCountInactiveStudios: PropTypes.func,
  getListSuspendHolels: PropTypes.func,
  listSuspendStudios: PropTypes.array,
  loading:  PropTypes.bool
};