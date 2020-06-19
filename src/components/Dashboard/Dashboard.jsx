import i18n from 'i18next';
import { withTranslation  } from 'react-i18next';
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./dashboard.scss";
import Button from "../reusableComponents/Button";
import EditProfile from "../../containers/EditProfile";
import ChangePassword from "../../containers/ChangePassword";
import Profile from "../../containers/Profile";
import StudioManagement from "../../containers/StudioManagement";
import Feedbacks from "../../containers/feedbacks";
import AdminContainer from "../../containers/AdminContainer";
import {
  USERPROFILE,
  EDITPROFILE,
  CHANGEPASSWORD,
  STUDIOMANAGEMENT,
  LEAVEFEEDBACK,
  USERORDERS,
  STUDIOS
} from "../../constants/authActionTypes";
import ListOfUserOrders from "../ListOfUserOrders/ListOfUserOrders.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.resendVerificationEmail = this.resendVerificationEmail.bind(this);
    this.showMyComponent = this.showMyComponent.bind(this);
    this.setComponentButtonActive = this.setComponentButtonActive.bind(this);
    this.setComponentActive = this.setComponentActive.bind(this);
    this.state = {
      hideAdmin: true
    };
  }

  setComponentActive() {
    const path = this.props.history.location.pathname.split("/");
    switch (path[2]) {
      case USERPROFILE:
        this.setComponentButtonActive(USERPROFILE);
        break;
      case EDITPROFILE:
        this.setComponentButtonActive(EDITPROFILE);
        break;
      case STUDIOMANAGEMENT:
        this.setComponentButtonActive(STUDIOMANAGEMENT);
        break;
      case LEAVEFEEDBACK:
        this.setComponentButtonActive(LEAVEFEEDBACK);
        break;
      case STUDIOS:
        this.setComponentButtonActive(STUDIOS);
        break;
      case USERORDERS:
        this.setComponentButtonActive(USERORDERS);
        break;
      case CHANGEPASSWORD:
        this.setComponentButtonActive(CHANGEPASSWORD);
        break;
      default:
        this.setComponentButtonActive(USERPROFILE);
        break;
    }
  }

  setComponentButtonActive(component) {
    let currentBtn = document.getElementsByClassName("user-cabinet-nav-item");
    for (let i = 0; i < currentBtn.length; i++) {
      currentBtn[i].className = currentBtn[i].className.replace(
        " activated",
        ""
      );
    }
    let componentBtn = document.getElementsByClassName(component);
    componentBtn[0].className += " activated"
  }

  componentDidMount() {
    this.props.inactiveStatusStudios();
    setTimeout(() => {
      this.setComponentActive();
    }, 1000);
  }

  async resendVerificationEmail() {
    await this.props.requestVerificationEmail(this.props.user.email);
  }

  showMyComponent(component) {
    this.props.history.push("/dashboard/" + component);
    this.setComponentActive();
  }

  render() {
    return (
      <div className='container-fluid user-cabinet-container m-0 '>
        {this.props.user ? (
          <div className='row'>
            <nav className='sidenav navbar-expand-md col-md-2 text-left p-0 '>
              <div className='collapse navbar-collapse' id='navbarToggler'>
                <ul className='user-cabinet-nav nav flex-column'>
                  <Button
                    label={
                      <span className='user-cabinet-nav-span'>{i18n.t('PROFILE')}</span>
                    }
                    className='btn btn-link user-cabinet-nav-item Profile activated'
                    handleClick={() =>
                      this.showMyComponent(USERPROFILE)
                    }></Button>

                  <Button
                    label={<span className='user-cabinet-nav-span'>{i18n.t('EDIT')}</span>}
                    className='btn btn-link user-cabinet-nav-item EditProfile'
                    handleClick={() =>
                      this.showMyComponent(EDITPROFILE)
                    }></Button>
                  <Button
                    label={
                      <span className='user-cabinet-nav-span'>
                        {i18n.t('STUDIO MANAGEMENT')}
                      </span>
                    }
                    className='btn btn-link user-cabinet-nav-item StudioManagement'
                    handleClick={() =>
                      this.showMyComponent(STUDIOMANAGEMENT)
                    }></Button>
                  <Button
                    label={
                      <span className='user-cabinet-nav-span'>
                        {i18n.t('LEAVE FEEDBACK')}
                      </span>
                    }
                    className='btn btn-link user-cabinet-nav-item LeaveFeedback'
                    handleClick={() =>
                      this.showMyComponent(LEAVEFEEDBACK)
                    }></Button>
                  {this.props.user.role === "ADMIN" ? (
                    <Button
                      label={
                            <span className='user-cabinet-nav-span'>
                               {i18n.t('Admin studios management')}
                            </span>
                      }
                      className='btn btn-link user-cabinet-nav-item studios'
                      handleClick={() => this.showMyComponent(STUDIOS)}></Button>
                  ) : null}
                  <Button
                    label={
                      <span className='user-cabinet-nav-span'>{i18n.t('MY ORDERS')}</span>
                    }
                    className='btn btn-link user-cabinet-nav-item UserOrders'
                    handleClick={() =>
                      this.showMyComponent(USERORDERS)
                    }></Button>
                  {this.props.user.authType !== "google" ? (
                    <Button
                      label={
                        <span className='user-cabinet-nav-span'>
                          {i18n.t('CHANGE PASSWORD')}
                        </span>
                      }
                      className='btn btn-link user-cabinet-nav-item ChangePassword'
                      handleClick={() =>
                        this.showMyComponent(CHANGEPASSWORD)
                      }></Button>
                  ) : null}
                </ul>
              </div>
            </nav>
            <main className='container-fluid col-md-10 p-5'>
              <div className='row justify-content-center'>
                {this.props.history.location.pathname ==
                "/dashboard/" + EDITPROFILE ? (
                  <EditProfile
                    showMyComponent={this.showMyComponent}></EditProfile>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + STUDIOS ? (
                  <AdminContainer
                    showMyComponent={this.showMyComponent}></AdminContainer>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + USERPROFILE ? (
                  <Profile showMyComponent={this.showMyComponent}></Profile>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + CHANGEPASSWORD ? (
                  <ChangePassword
                    showMyComponent={this.showMyComponent}></ChangePassword>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + STUDIOMANAGEMENT ? (
                  <StudioManagement
                    showMyComponent={this.showMyComponent}></StudioManagement>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + LEAVEFEEDBACK ? (
                  <Feedbacks showMyComponent={this.showMyComponent}></Feedbacks>
                ) : null}
                {this.props.history.location.pathname ==
                "/dashboard/" + USERORDERS ? (
                  <ListOfUserOrders
                    showMyComponent={this.showMyComponent}></ListOfUserOrders>
                ) : null}
              </div>
            </main>
          </div>
        ) : null}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getDashboard: PropTypes.func,
  user: PropTypes.object,
  requestVerificationEmail: PropTypes.func,
  requestGetDashboard: PropTypes.func,
  inactiveStatusStudios: PropTypes.func,
  countInactiveStudios: PropTypes.number,
  history: PropTypes.object.isRequired
};

export default withTranslation() (Dashboard);