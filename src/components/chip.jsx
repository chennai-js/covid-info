import React from "react";

export const ChipType = {
  Info: "bg-green-800 text-white",
  Warn: "bg-yellow-500 text-white",
  Error: "bg-red-700 text-white"
}

export function Chip(props) {
  let { type, ...restProps } = props;
  return <span className={`rounded-md px-2 ${type} text-lg font-bold`} {...restProps} />;
}
