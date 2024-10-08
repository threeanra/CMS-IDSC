import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import Loading from "../loading/loading";

interface ButtonProps {
  title: string | ReactNode; // Allow string or any ReactNode (e.g., JSX like <Loading />)
  size: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "neutral" | "error" | "success";
  icon?: IconDefinition;
  width?: number;
  style?: React.CSSProperties; // Add custom styles
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-500",
    neutral: "bg-gray-600 hover:bg-gray-500",
    error: "bg-red-600 hover:bg-red-500",
    success: "bg-green-600 hover:bg-green-500",
  };

  const selectedColor = colorClasses[props.color || "primary"];

  return (
    <button
      className={`text-white font-bold btn-${props.size} ${selectedColor} text-md rounded-md px-4 py-2 flex items-center justify-center`} // Prevent clicks when disabled or loading
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      style={{
        width: props.width,
        opacity: props.disabled || props.loading ? 0.5 : 1,
        pointerEvents: props.disabled || props.loading ? "none" : "auto",
        ...props.style,
      }}
    >
      {props.icon && !props.loading && (
        <FontAwesomeIcon icon={props.icon} className="mr-2" />
      )}
      {/* Conditional rendering for title or loading spinner */}
      {props.loading ? <Loading type="sm" /> : props.title}
    </button>
  );
}
