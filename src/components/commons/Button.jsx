import React from "react";

const sizeClasses = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
  lg: "px-4 py-2 text-sm",
  mobile: "py-2 text-sm sm:text-sm rounded-lg",
};

const widthClasses = {
  full: "w-full",
  md: "w-40",
  sm: "w-25",
  auto: "w-auto",
};

const variantClasses = {
  primary: "bg-brand text-white",
  success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
  danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
  outline:
    "border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50",
  white: "bg-white text-blue-700 hover:bg-blue-50",
  brand:
    "bg-gradient-to-r from-[#7C4DFF] to-[#5A2DFF] hover:opacity-90 text-white shadow-md",
};

export default function Button({
  text,
  children,
  type = "button",
  size = "lg",
  width = "full",
  variant = "primary",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${widthClasses[width]} ${sizeClasses[size]} ${variantClasses[variant]} rounded-md transition-all duration-200 ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
        {text}
      </span>
    </button>
  );
}