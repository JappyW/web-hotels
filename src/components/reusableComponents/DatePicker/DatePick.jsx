import React from "react";
import { Field } from "redux-form";
import PropTypes from 'prop-types';

export const DatePick = props => {
  const { name, label, min } = props;
  return (
    <div>
      <label>{label}</label>
      <Field
        type="date"
        component="input"
        className="form-control"
        name={name}
        min={min}
      />
    </div>
  );
};

DatePick.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.string
}