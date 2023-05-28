import React from "react";

const KeyDisplay = ({ givenKeys }) => {
  const keys = givenKeys.split(" ");
  return (
    <div className="keys-to-type">
      {keys.map((key, index) => {
        return <h1 key={index + 1}>{key}</h1>;
      })}
    </div>
  );
};

export default KeyDisplay;
