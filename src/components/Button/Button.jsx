import React from "react";

const Button = ({ title, onClick }) => (
  <button className="Button" onClick={onClick}>
    {title}
  </button>
);

export default Button;
