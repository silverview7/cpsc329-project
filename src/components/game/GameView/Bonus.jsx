import React from "react";

const Bonus = ({ amount, show }) => {
  return <div className={`Bonus ${show ? "show" : "hidden"}`}>+ {amount}</div>;
};

export default Bonus;
