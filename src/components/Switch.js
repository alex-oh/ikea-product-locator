import React from "react";
import "./switch.css";

// Source: https://codesandbox.io/p/sandbox/toggle-switch-forked-vv3dp
const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <label style={{ background: isOn && onColor }} className="react-switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        type="checkbox"
      />
      <div className="react-switch-button" />
      <div className="react-switch-labels">
        <span>BIG</span>
        <span>SMOL</span>
      </div>
    </label>
  );
};

export default Switch;
