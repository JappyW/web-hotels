import i18n from 'i18next';
import { withTranslation  } from 'react-i18next';
import React, { Component } from "react"
import GoogleLogin from "react-google-login"
import Button from "../reusableComponents/Button"
import CustomInput from "../CustomInput"
import PropTypes from "prop-types"
import { Field } from "redux-form"
import { Link } from "react-router-dom"

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.OAuthGoogle = this.OAuthGoogle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.OAuthFacebook = this.OAuthFacebook.bind(this)
  }

  async onSubmit(formData) {
      await this.props.requestSignIn(formData)
      if (this.props.token) {
        this.props.history.push("/dashboard/Profile")
      }
  }

  async OAuthGoogle(res) {
    await this.props.requestOAuthGoogle(res.accessToken)
  }

  async OAuthFacebook(res) {
    await this.props.requestOAuthFacebook(res.accessToken)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          <div className='custom-auth-card col-md-5 my-5 p-5'>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field
                  name='email'
                  type='text'
                  id='email'
                  label={i18n.t('ENTER YOUR EMAIL')}
                  placeholder='email@email.com'
                  component={CustomInput}
                />
              </fieldset>
              <fieldset>
                <Field
                  name='password'
                  type='password'
                  id='password'
                  label={i18n.t('ENTER YOUR PASSWORD')}
                  placeholder='Password'
                  component={CustomInput}
                />
              </fieldset>
              {this.props.errorMessage ? (
                <div className='alert alert-danger'>
                  {this.props.errorMessage}
                </div>
              ) : null}
              <div className='text-center mb-2  container justify-content-around d-flex'>
                <Button
                  type='submit'
                  label={i18n.t('SIGN IN')}
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
            <div>
              <div className='p-2 text-center'>
                <span>
                  <Link to='/forgotpassword' className='font-weight-bold'>
                  {i18n.t('FORGOT YOUR PASSWORD')}?
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignIn.propTypes = {
  errorMessage: PropTypes.string,
  signIn: PropTypes.func,
  OAuthGoogle: PropTypes.func,
  validateAuth: PropTypes.func,
  requestValidationAuth: PropTypes.func,
  requestSignIn: PropTypes.func,
  requestOAuthGoogle: PropTypes.func,
  requestOAuthFacebook: PropTypes.func,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  token: PropTypes.object
}

export default withTranslation() (SignIn);
