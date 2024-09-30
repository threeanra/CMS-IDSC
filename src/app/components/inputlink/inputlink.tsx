/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function InputLink({ label, link }: any) {
  const redirectLink = () => {
    window.open(link, "_blank");
  };
  return (
    <div className="mb-3">
      <div className="label flex flex-col justify-start items-start">
        <span className="label-text font-bold text-base">{label}</span>
      </div>
      <div className="flex">
        <input
          onClick={redirectLink}
          value={"Click Here"}
          readOnly
          className="w-full items-center text-center cursor-pointer hover:bg-blue-100 duration-300 rounded-r-none rounded-l-md input input-bordered"
        />
        <button
          className="btn bg-primary hover:bg-primary rounded-l-none rounded-r-md text-white font-bold"
          onClick={redirectLink}
        >
          Check file
        </button>
      </div>
    </div>
  );
}
