import i18n from "i18next";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import Button from "../reusableComponents/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { INVALIDEMAIL, EMAIL_REGEX } from "../../constants/authActionTypes";
const EMAIL = "email";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: "",
        password: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case EMAIL:
        errors.email = EMAIL_REGEX.test(value) ? "" : INVALIDEMAIL;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      email: event.target[0].value
    };
    if (validateForm(this.state.errors)) {
      await this.props.requestSendRecoveryEmail(formData);
      this.props.history.push("/signin");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div className='row justify-content-center align-align-items-left'>
          <div className='col-md-5 p-5 my-5 custom-auth-card'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email' className='font-weight-bold'>
                {i18n.t('ENTER YOUR EMAIL')}
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='example@example.com'
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              {errors.email.length > 0 && (
                <div className='alert alert-danger'>{errors.email}</div>
              )}
              <div className='row justify-content-around mt-3 px-5'>
                <Button
                  type='submit'
                  label={i18n.t('SEND')} 
                  className='btn ch-btn-primary '
                />
                <button className='btn ch-btn-danger ' type='button'>
                  <Link to='/' className='nav-link text-white'>
                    {i18n.t("CANCEL")}
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  errorMessage: PropTypes.string,
  requestValidationProfile: PropTypes.func,
  requestGetEditProfile: PropTypes.func,
  handleSubmit: PropTypes.func,
  requestSendRecoveryEmail: PropTypes.func,
  history: PropTypes.object
};

export default withTranslation()(ForgotPassword);
