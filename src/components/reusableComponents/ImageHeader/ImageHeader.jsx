import React from "react";
import PropTypes from 'prop-types';

export const ImageHeader = props => {
  const { label, bgImage, wrapperClasses, headingClasses } = props;

  const divStyle = {
    backgroundImage: "url(" + bgImage + ")",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "1.5rem 1.25rem"
  };

  const headingStyle = {
    backgroundColor: "#00000080",
    padding: "0.5rem 1rem 1rem",
    textAlign: "center"
  };

  return (
    <div className={wrapperClasses} style={divStyle}>
      <h1 className={headingClasses} style={headingStyle}>
        {label}
      </h1>
    </div>
  );
};

ImageHeader.propTypes = {
  label: PropTypes.string,
  bgImage: PropTypes.string,
  wrapperClasses: PropTypes.string,
  headingClasses: PropTypes.string
}