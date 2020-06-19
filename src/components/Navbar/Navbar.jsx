import "./navbar.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import i18next from "i18next";
import i18n from "i18next";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import { JWT_TOKEN } from "../../constants/authActionTypes";
import {
  requestSignOut,
  requestGetDashboard,
  requestDispatchAuthSignedIn
} from "../../actions/authAction";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = {
      lng: i18next.language
    };
  }

  async signOut() {
    await this.props.requestSignOut();
  }

  async componentDidMount() {
    if (localStorage.getItem(JWT_TOKEN)) {
      this.props.requestDispatchAuthSignedIn();
      this.props.requestGetDashboard();
    }
  }

  changeLanguage = e => {
    const lng = e.target.value;
    this.setState({ lng: lng }, () => {
      i18next.changeLanguage(lng);
    });
  };

  render() {
    return (
      <nav className=' navbar fixed-top navbar-expand-lg navbar-light bg-main-light'>
        <Link to='/home/page/1' className='navbar-brand mr-5 '>
          <span className='logo-name'>WebStudios</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarToggler'
          aria-controls='navbarToggler'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarToggler'>
          <ul className='navbar-nav ml-auto'>
          <li className="nav-item language">      
          <button
            className={this.state.lng === 'ua' ? 'ua active' : 'ua'}
            onClick={this.changeLanguage}
            value='ua'  
          /> 
          <button
            className={this.state.lng === 'en' ? 'en active' : 'en'}
            onClick={this.changeLanguage}
            value='en'
          /> 
            </li>
            {!this.props.isAuth
              ? [
                  <li className='nav-item' key='signup'>
                    <Link to='/signup' className='nav-link'>
                    {i18n.t('SIGN UP')}   
                    </Link>
                  </li>,
                  <li className='nav-item' key='signin'>
                    <Link to='/signin' className='nav-link'>
                    {i18n.t('SIGN IN')}
                    </Link>
                  </li>
                ]
              : null}
            {this.props.isAuth
              ? [
                  <li className='nav-item' key='dashboard'>
                    <Link to='/dashboard/Profile' className='nav-link'>
                        <span>
                          <FaUser className='mr-1' />
                     {i18n.t('CABINET')}
                        </span>
                    </Link>
                  </li>,
                  <li className='nav-item' key='signout'>
                    <Link
                      to='/home/page/:1'
                      className='nav-link'
                      onClick={this.signOut}>
                      {i18n.t('SIGN OUT')}
                    </Link>
                  </li>
                ]
              : null}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  isAuth: PropTypes.bool,
  authType: PropTypes.string,
  requestDispatchAuthSignedIn: PropTypes.func,
  requestSignOut: PropTypes.func,
  requestGetDashboard: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.dash.user,
    isAuth: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestGetDashboard: () => dispatch(requestGetDashboard()),
    requestSignOut: () => dispatch(requestSignOut()),
    requestDispatchAuthSignedIn: () => dispatch(requestDispatchAuthSignedIn())
  };
}

const NavbarWithTranslation = new withTranslation()(Navbar);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarWithTranslation);
