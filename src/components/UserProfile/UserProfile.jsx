import React, { Component } from "react";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import Button from "../reusableComponents/Button";
import { DEFAULT_PROFILE_WIDTH, DEFAULT_PROFILE_URL } from "../../constants";
import { EDITPROFILE } from "../../constants/authActionTypes";
import "./UserProfile.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.resendVerificationEmail = this.resendVerificationEmail.bind(this);
  }
  async componentDidMount() {
    await this.props.clearReduxField();
  }

  async signOut() {
    await this.props.requestSignOut();
  }

  async resendVerificationEmail() {
    let element = document.getElementById("verificationDiv");
    element.innerHTML = "<p>SENT</p>";
    await this.props.requestVerificationEmail(this.props.user.email);
  }

  render() {
    return (
      <div className='container m-0'>
        <div className='row justify-content-center'>
          {this.props.user
            ? [
                <div className='col-md-6 text-center' key='user-cabinet'>
                  <img
                    src={
                      this.props.image.length > 0
                        ? this.props.image
                        : DEFAULT_PROFILE_URL
                    }
                    alt='Profile Image'
                    className='img-fluid'
                    width={DEFAULT_PROFILE_WIDTH}
                  />

                  <h2 className='profile-email mt-2'>{this.props.user.email}</h2>
                  {this.props.user.fullname ? (
                    <h4 className='profile-name'>{this.props.user.fullname}</h4>
                  ) : (
                    <h4 className='profile-name'>{this.props.user.fullname}</h4>
                  )}
                </div>,
              ]
            : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getDashboard: PropTypes.func,
  user: PropTypes.object,
  signOut: PropTypes.func,
  requestSignOut: PropTypes.func,
  requestVerificationEmail: PropTypes.func,
  image: PropTypes.string,
  showMyComponent: PropTypes.func,
  clearReduxField: PropTypes.func
};

export default withTranslation()(Dashboard);
