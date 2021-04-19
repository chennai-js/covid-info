import React from "react";

export function Card(props) {
  let { className = "", ...restProps } = props;
  return <div className={`rounded shadow pointer p-4 ${className}`} {...restProps} />;
}
