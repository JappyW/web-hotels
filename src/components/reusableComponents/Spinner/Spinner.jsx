import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="lds-css ng-scope">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
