import React from "react";

export const ChipType = {
  Info: "bg-green-800 text-white",
  Warn: "bg-yellow-500",
  Error: "bg-red-600"
}

export function Chip(props) {
  let { type, ...restProps } = props;
  return <span className={`rounded-md p-1 ${type}`} {...restProps} />;
}
