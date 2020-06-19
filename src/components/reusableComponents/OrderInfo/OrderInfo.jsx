import React from "react";
import PropTypes from 'prop-types';

export const OrderInfo = props => {
  const { order, label } = props;

  const rows = [];
  for (let [key, value] of Object.entries(order)) {
    rows.push(
      <div className="btn btn-outline-info mr-1 p-2 my-1" key={key}>
        {value}
      </div>
    );
  }
  return (
    <div className="pt-2">
      <p className="mb-1">{label}</p>
      <div>{rows}</div>
    </div>
  );
};

OrderInfo.propTypes = {
  order: PropTypes.object,
  label: PropTypes.string,
}