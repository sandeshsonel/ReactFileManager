import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner flex justify-center items-center">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
};

export default Spinner;
