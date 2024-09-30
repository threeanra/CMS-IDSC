import React from "react";

interface InputProps {
  type: "text" | "password" | "email" | "number";
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  return (
    <div className="form-control w-full flex md:flex-row flex-col md:items-center mb-5">
      <div className="label min-w-56">
        <span className="label-text font-bold text-base">{props.label}</span>
      </div>

      <div className="w-full">
        <input
          type={props.type}
          value={props.value}
          disabled
          className={`input disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none input-bordered w-full input-primary rounded-md `}
        />
      </div>
    </div>
  );
}
