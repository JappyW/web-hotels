import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id } className="font-weight-bold">{ this.props.label }</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
          placeholder={ this.props.placeholder }
          className="form-control"
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
        />
      </div>
    );
  }
}
CustomInput.propTypes = {
  input: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.any,
  placeholder: PropTypes.any,
  type: PropTypes.any,
  onChange: PropTypes.func,
}