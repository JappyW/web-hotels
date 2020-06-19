import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const {
    name,
    type,
    label,
    ico,
    handleClick,
    disabled,
    title,
    className,
    dataToggle,
    dataTarget,
    ariaExpanded,
    ariaControls,
    icoLeft
  } = props;
  return (
    <button
      name={name}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      title={title}
      className={className}
      data-toggle={dataToggle}
      data-target={dataTarget}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
     {icoLeft} {label} {ico}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.any,
  ico: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  dataToggle: PropTypes.string,
  dataTarget: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaControls: PropTypes.string,
  icoLeft: PropTypes.object,
}

export default Button;