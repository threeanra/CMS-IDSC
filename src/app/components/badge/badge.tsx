import React from "react";

// Define BadgeProps
interface BadgeProps {
  type: "neutral" | "accent" | "secondary" | "success" | "warning" | "error";
  title: string;
}

export default function Badge({ type, title }: BadgeProps) {
  const colorClasses = {
    neutral: "bg-gray-600 hover:bg-gray-500",
    accent: "bg-blue-600 hover:bg-blue-500",
    secondary: "bg-yellow-600 hover:bg-yellow-500",
    success: "bg-green-600 hover:bg-green-500",
    warning: "bg-orange-600 hover:bg-orange-500",
    error: "bg-red-600 hover:bg-red-500",
  };

  // Apply the appropriate styles based on the type
  return (
    <div
      className={`badge ${colorClasses[type]} text-white p-3 flex items-center justify-center rounded-md`}
    >
      {title}
    </div>
  );
}
