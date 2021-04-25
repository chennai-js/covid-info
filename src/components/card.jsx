import React from "react";
import PropTypes from "prop-types";

export function Card({ className = "", ...restProps }) {
  return (
    <div className={`rounded shadow pointer p-4 ${className}`} {...restProps} />
  );
}

Card.propTypes = {
  className: PropTypes.string,
};
