import React from "react";
import "./Model.css";
import { RiCloseLine } from "@remixicon/react";

const Model = ({ children, handleClose }) => {
  return (
    <div className="model-background">
      <div className="model">
        <div className="model-controls">
          <button className="closeButton" onClick={handleClose}>
            <RiCloseLine />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Model;
