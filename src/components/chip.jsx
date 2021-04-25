import React from "react";
import PropTypes from "prop-types";

export const ChipType = {
  Info: "bg-green-800 text-white",
  Warn: "bg-yellow-500 text-white",
  Error: "bg-red-700 text-white",
};

export function Chip({ type, className, ...restProps }) {
  return (
    <span
      className={`rounded-md px-2 ${type} text-lg font-bold ${className}`}
      {...restProps}
    />
  );
}
Chip.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};
