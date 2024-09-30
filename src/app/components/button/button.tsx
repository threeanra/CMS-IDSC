import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonProps {
  title: string;
  size: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "neutral" | "error" | "success";
  icon?: IconDefinition;
  width?: number;
  style?: React.CSSProperties; // Add custom styles
  disabled?: boolean; // Boolean to disable the button
  onClick?: () => void; // Function to handle clicks
}

export default function Button(props: ButtonProps) {
  // Define color classes for different button colors
  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-500",
    neutral: "bg-gray-600 hover:bg-gray-500",
    error: "bg-red-600 hover:bg-red-500",
    success: "bg-green-600 hover:bg-green-500",
  };

  // Select color class based on prop, default to primary
  const selectedColor = colorClasses[props.color || "primary"];

  return (
    <button
      className={`text-white font-bold btn-${props.size} ${selectedColor} text-md rounded-md px-4 py-2 flex items-center justify-center`}
      onClick={props.disabled ? undefined : props.onClick} // Use undefined to prevent clicks when disabled
      disabled={props.disabled}
      style={{
        width: props.width,
        opacity: props.disabled ? 0.5 : 1, // Change opacity if disabled
        pointerEvents: props.disabled ? "none" : "auto", // Disable pointer events if disabled
        ...props.style, // Allow custom styles to override
      }}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} className="mr-2" />}
      {props.title}
    </button>
  );
}
