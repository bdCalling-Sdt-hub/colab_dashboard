import React from "react";

const Button = ({ onClick, children, className = "", disabled }) => {
  return (
    <button
      onClick={disabled ? null : onClick}
      disabled={disabled}
      className={`bg-[#B4007E] text-white rounded-md w-full py-1 ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
