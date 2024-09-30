import React from "react";

interface TextAreaProps {
  label: string;
  value: string;
}

export default function TextArea(props: TextAreaProps) {
  return (
    <div className="form-control w-full flex md:flex-row flex-col md:items-center mb-5">
      <div className="label min-w-56">
        <span className="label-text font-bold text-base">{props.label}</span>
      </div>

      <div className="w-full">
        <textarea
          value={props.value}
          disabled
          className="textarea resize-none disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none w-full textarea-bordered rounded-md textarea-primary textarea-md h-[180px]"
        />
      </div>
    </div>
  );
}
