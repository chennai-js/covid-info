import React from "react";

export function Card({ className = "", ...restProps }) {
  return <div className={`rounded shadow pointer p-4 ${className}`} {...restProps} />;
}
