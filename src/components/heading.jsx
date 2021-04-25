import React from "react";
import PropTypes from "prop-types";

export const HeadingSize = {
  Main: "text-blue-600 text-lg font-bold",
  Sub: "text-blue-400 text-md font-medium",
};
export function Heading({
  size = HeadingSize.Main,
  className = "",
  ...restProps
}) {
  return <p className={`${size} ${className}`} {...restProps} />;
}

Heading.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};
