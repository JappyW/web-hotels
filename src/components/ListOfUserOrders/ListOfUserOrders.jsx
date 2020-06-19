import React from "react";
import ListOfCreatedUserOrders from "../../containers/ListOfCreatedUserOrders";
import ListOfOtherUserOrders from "../../containers/ListOfOtherUserOrders";
import ListOfOwnerOrders from "../../containers/ListOfOwnerOrders";
import { PAID, COMPLETED, CREATED, OWNER } from "../../constants/actionTypes";
import i18n from "i18next";
import { withTranslation } from "react-i18next";

class ListOfUserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.showMyTab = this.showMyTab.bind(this);
    this.state = {
      component: CREATED
    };
  }

  showMyTab(component) {
    this.setState({
      component: component
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <ul className='nav nav-tabs' id='myTab' role='tablist'>
          <li className='nav-item'>
            <a
              className='nav-link items-nav-link p-2 active'
              id='created-orders'
              data-toggle='tab'
              href='#home'
              role='tab'
              aria-controls='home'
              aria-selected='true'
              onClick={() => this.showMyTab(CREATED)}>
              {i18n.t('USER_ORDERS.CREATED')}
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link items-nav-link p-2'
              id='paid-orders'
              data-toggle='tab'
              href='#profile'
              role='tab'
              aria-controls='profile'
              aria-selected='false'
              onClick={() => this.showMyTab(PAID)}>
              {i18n.t('USER_ORDERS.PAID')}
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link items-nav-link p-2'
              id='completed-orders'
              data-toggle='tab'
              href='#contact'
              role='tab'
              aria-controls='contact'
              aria-selected='false'
              onClick={() => this.showMyTab(COMPLETED)}>
               {i18n.t('USER_ORDERS.COMPLETED')}
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link items-nav-link p-2'
              id='owner-orders'
              data-toggle='tab'
              href='#owner'
              role='tab'
              aria-controls='owner'
              aria-selected='false'
              onClick={() => this.showMyTab(OWNER)}>
               {i18n.t('USER_ORDERS.OWNER')}
            </a>
          </li>
        </ul>
        <div className='tab-content mt-3' id='myTabContent'>
          <div
            className='tab-pane fade show active'
            id='home'
            role='tabpanel'
            aria-labelledby='created-orders'>
            {this.state.component == CREATED ? (
              <ListOfCreatedUserOrders></ListOfCreatedUserOrders>
            ) : null}
          </div>
          <div
            className='tab-pane fade'
            id='profile'
            role='tabpanel'
            aria-labelledby='paid-orders'>
            {this.state.component == PAID ? (
              <ListOfOtherUserOrders
                requestedOrders={PAID}></ListOfOtherUserOrders>
            ) : null}
          </div>
          <div
            className='tab-pane fade'
            id='contact'
            role='tabpanel'
            aria-labelledby='completed-orders'>
            {this.state.component == COMPLETED ? (
              <ListOfOtherUserOrders
                requestedOrders={COMPLETED}></ListOfOtherUserOrders>
            ) : null}
          </div>
          <div
            className='tab-pane fade'
            id='owner'
            role='tabpanel'
            aria-labelledby='owner-orders'>
            {this.state.component == OWNER ? (
              <ListOfOwnerOrders/>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation() (ListOfUserOrders);
