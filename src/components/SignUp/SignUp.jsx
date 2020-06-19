import i18n from "i18next";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import Button from "../reusableComponents/Button";
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import {
  INVALIDEMAIL,
  INVALID_PASSWORD,
  EMAIL_REGEX,
  PASSWORD_REGEX
} from "../../constants/authActionTypes";
import "./signUp.scss";
const PASSWORD = "password";
const EMAIL = "email";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.OAuthGoogle = this.OAuthGoogle.bind(this);
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
      case PASSWORD:
        errors.password = PASSWORD_REGEX.test(value) ? "" : INVALID_PASSWORD;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      email: event.target[0].value,
      password: event.target[1].value
    };
    if (validateForm(this.state.errors)) {
      await this.props.requestSignUp(formData);
      if (this.props.token) {
        this.props.history.push("/dashboard/Profile");
      }
    }
  };

  async OAuthGoogle(res) {
    await this.props.requestOAuthGoogle(res.accessToken);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          <div className='custom-auth-card col-md-5 my-5 p-5'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email' className='font-weight-bold'>
                {i18n.t('ENTER YOUR EMAIL')}
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email@email.com'
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password' className='font-weight-bold'>
                {i18n.t('ENTER YOUR PASSWORD')}
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              {errors.email.length > 0 && (
                <div className='alert alert-danger'>{errors.email}</div>
              )}
              {errors.password.length > 0 && (
                <div className='alert alert-danger'>{errors.password}</div>
              )}
              {this.props.errorMessage ? (
                <div className='alert alert-danger'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              <div className='text-center mb-2 container justify-content-around d-flex'>
                <Button
                  type='submit'
                  label={i18n.t('SIGN UP')}
                  className='btn btn-primary font-weight-bold'
                  textColor='white'
                />
                <GoogleLogin
                  clientId='24601342915-eo1bn300h90fnkvr8aflq1j2rf7khr01.apps.googleusercontent.com'
                  buttonText='Google'
                  onSuccess={this.OAuthGoogle}
                  onFailure={this.OAuthGoogle}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  errorMessage: PropTypes.string,
  signup: PropTypes.func,
  OAuthGoogle: PropTypes.func,
  requestSignUp: PropTypes.func,
  requestOAuthGoogle: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  token: PropTypes.object
};
export default withTranslation()(SignUp);
