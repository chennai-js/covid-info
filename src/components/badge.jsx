import React from "react";
import PropTypes from "prop-types";

export function Badge({ value, active, handleFilter }) {
  return (
    <span
      onClick={handleFilter}
      className={`${
        !active
          ? "border border-yellow-500 text-black"
          : "bg-yellow-500 text-white"
      }   text-xs py-1 mb-1 px-4 rounded-full cursor-pointer`}
    >
      {value}
    </span>
  );
}
Badge.propTypes = {
  value: PropTypes.string,
  active: PropTypes.boolean,
  handleFilter: PropTypes.func,
};
