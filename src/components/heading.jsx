import React from "react";

export const HeadingSize = {
  Main: "text-blue-600 text-lg font-bold",
  Sub: "text-blue-400 text-md font-medium"
}
export function Heading(props) {
  let { size = HeadingSize.Main, ...restProps } = props;
  return <p className={`${size}`} {...restProps} />
}