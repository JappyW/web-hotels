import React from "react";
import PropTypes from "prop-types";

export const AlertMessage = props => {
  const { message, alertStyle } = props;
  return <div className={`alert ${alertStyle}`}>{message}</div>;
};

AlertMessage.propTypes = {
  message: PropTypes.string,
  alertStyle: PropTypes.string
};

/* possible values for alertStyle:
  alert-success,
  alert-warning,
  alert-danger
*/