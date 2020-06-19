import React, { Component } from "react"
import Button from "../reusableComponents/Button"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  INVALID_REAPEATED_PASSWORD,
  PASSWORD_REGEX,
  INVALID_NEW_PASSWORD,
  NEW_PASSWORD,
  REPEATED_NEW_PASSWORD
} from "../../constants/authActionTypes";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class RecoverPassword extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      newPassword: null,
      repeatedNewPassword: null,
      errors: {
        newPassword: "",
        repeatedNewPassword: ""
      }
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const formData = {
      newPassword: event.target[0].value,
      repeatedNewPassword: event.target[1].value
    }
    const newPassword = event.target[0].value;
    
    await this.props.requestValidationPassword(formData);
    if (validateForm(this.state.errors) && !this.props.errorMessage){
      await this.props.requestRecoverPassword({
        email: this.props.match.params.email,
        password: newPassword
      })
      this.props.history.push("/dashboard/Profile")
    }
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
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
      <div className='container'>
        <div className='row justify-content-center align-align-items-left'>
          <div className='col-md-5 p-5 my-5 custom-auth-card'>
            <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <label htmlFor='newPassword' className='font-weight-bold'>
                  New password
                </label>
                <input
                  type='password'
                  name='newPassword'
                  placeholder='New password'
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='repeatedNewPassword'
                  className='font-weight-bold'>
                  Repeated new password
                </label>
                <input
                  type='password'
                  name='repeatedNewPassword'
                  placeholder='Repeat new password'
                  className='form-control'
                  onChange={this.handleChange}
                  noValidate
                />
              </div>
              {errors.newPassword.length > 0 && (
                <div className='alert alert-danger'>{errors.newPassword}</div>
              )}
              {errors.repeatedNewPassword.length > 0 && (
                <div className='alert alert-danger'>
                  {errors.repeatedNewPassword}
                </div>
              )}
              {this.props.errorMessage ? (
                <div className='alert alert-danger'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              <div className='row justify-content-around mt-3 px-5'>
                <Button
                  type='submit'
                  label='Save'
                  className="btn ch-btn-primary "
                />
                <button className='btn ch-btn-danger ' type='button'>
                  <Link to='/dashboard' className='nav-link text-white'>
                    Cancel
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

RecoverPassword.propTypes = {
  errorMessage: PropTypes.string,
  requestValidationRecoverPassword: PropTypes.func,
  requestValidationPassword: PropTypes.func,
  requestRecoverPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.any,
}

export default RecoverPassword
