import React from "react";
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from "./utils";
import "./reactCreditCard.scss";
import "react-credit-cards/es/styles-compiled.css";
import PropTypes from "prop-types";

class ReactCreditCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationModalIsOpen: false,
      modalOpen: false,
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      formData: null
    };
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = [...event.target.elements]
      .filter(data => data.name)
      .reduce((account, data) => {
        account[data.name] = data.value;
        return account;
      }, {});
    this.props.onSubmit(formData);
  };

  render() {
    const { name, number, expiry, cvc, focused } = this.state;

    return (
      <div key='Payment'>
        <div className='App-payment'>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form
            className='react-credit-card'
            ref={c => (this.form = c)}
            onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className='row'>
              <div className='col-6'>
                <input
                  type='tel'
                  name='expiry'
                  className='form-control'
                  placeholder='Valid Thru'
                  pattern='\d\d/\d\d'
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className='col-6'>
                <input
                  type='tel'
                  name='cvc'
                  className='form-control'
                  placeholder='CVC'
                  pattern='\d{3,4}'
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <div className='container px-4 pt-4'>
              <div className='row justify-content-around'>
                <button className='btn ch-btn-primary ' type='submit'>
                  PAY
                </button>
                <button
                  className='btn ch-btn-danger '
                  type='button'
                  onClick={this.props.openConfirmationModal}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
ReactCreditCards.propTypes = {
  onSubmit: PropTypes.func,
  openConfirmationModal: PropTypes.func,
}
export default ReactCreditCards;
