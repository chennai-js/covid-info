import React from "react";

export const ButtonType = {
  Primary: "flex text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white",
  Secondary: "text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white",
  Default: "hover:bg-gray-200 border-gray-500"
}
export function Button({ type = ButtonType.Default, className, ...restProps }) {
  return <button className={`rounded-full px-3 py-1 border-2 ${type} ${className}`} {...restProps} />
}