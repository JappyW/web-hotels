import i18n from "i18next";
import { withTranslation } from "react-i18next";
import React, { Component } from "react";
import Button from "../reusableComponents/Button";
import PropTypes from "prop-types";
import {
  USERPROFILE,
  INVALID_REAPEATED_PASSWORD,
  PASSWORD_IS_TOO_SHORT,
  PASSWORD_REGEX,
  INVALID_NEW_PASSWORD,
  PRE_PASSWORD_CHANGE_ERROR,
  NEW_PASSWORD,
  REPEATED_NEW_PASSWORD
} from "../../constants/authActionTypes";
import "./changePassword.scss";
const OLD_PASSWORD = "oldPassword";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      oldPassword: null,
      newPassword: null,
      repeatedNewPassword: null,
      errors: {
        oldPassword: "",
        newPassword: "",
        repeatedNewPassword: ""
      }
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      oldPassword: event.target[0].value,
      newPassword: event.target[1].value,
      repeatedNewPassword: event.target[2].value
    };
    await this.props.requestValidationPassword(formData);
    if (validateForm(this.state.errors) && !this.props.errorMessage) {
      await this.props.requestChangePassword(formData);
      setTimeout(() => {
        if (!this.props.errorMessage) {
          this.props.showMyComponent(USERPROFILE);
        }
      }, 1000);
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case OLD_PASSWORD:
        errors.oldPassword = value.length > 0 ? "" : PASSWORD_IS_TOO_SHORT;
        break;
      case NEW_PASSWORD:
        errors.newPassword = PASSWORD_REGEX.test(value)
          ? ""
          : INVALID_NEW_PASSWORD;
        break;
      case REPEATED_NEW_PASSWORD:
        errors.repeatedNewPassword = PASSWORD_REGEX.test(value)
          ? ""
          : INVALID_REAPEATED_PASSWORD;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='container-fluid mt-5 '>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='password' className='font-weight-bold'>
                  {i18n.t("OLD PASSWORD")}
                </label>
                <input
                  type='password'
                  name='oldPassword'
                  placeholder={i18n.t("OLD PASSWORD")}
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group'>
                <label htmlFor='newPassword' className='font-weight-bold'>
                  {i18n.t("NEW PASSWORD")}
                </label>
                <input
                  type='password'
                  name='newPassword'
                  placeholder={i18n.t("NEW PASSWORD")}
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='repeatedNewPassword'
                  className='font-weight-bold'>
                  {i18n.t("REPEATED NEW PASSWORD")}
                </label>
                <input
                  type='password'
                  name='repeatedNewPassword'
                  placeholder={i18n.t("REPEATE NEW PASSWORD")}
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              {errors.oldPassword.length > 0 && (
                <div className='alert alert-danger'>{errors.oldPassword}</div>
              )}
              {errors.newPassword.length > 0 && (
                <div className='alert alert-danger'>{errors.newPassword}</div>
              )}
              {errors.repeatedNewPassword.length > 0 && (
                <div className='alert alert-danger'>
                  {errors.repeatedNewPassword}
                </div>
              )}
              {this.props.errorMessage &&
              this.props.errorMessage != PRE_PASSWORD_CHANGE_ERROR ? (
                <div className='alert alert-danger'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              <div className='row justify-content-around mt-3 px-5'>
                <Button
                  type='submit'
                  label={i18n.t("SAVE")}
                  className='btn ch-btn-primary '
                />
                <Button
                  type='button'
                  label={i18n.t("CANCEL")}
                  className='btn ch-btn-danger '
                  handleClick={() => this.props.showMyComponent(USERPROFILE)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  errorMessage: PropTypes.string,
  requestValidationPassword: PropTypes.func,
  requestChangePassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  showMyComponent: PropTypes.func
};

export default withTranslation()(ChangePassword);
