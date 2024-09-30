import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
}

export default function Header(props: HeaderProps) {
  return (
    <>
      <div className="bg-primary mb-5 rounded-lg p-5 flex text-lg content-center items-center gap-3 text-white ">
        <FontAwesomeIcon icon={props.icon} />
        <span>{props.title}</span>
      </div>
    </>
  );
}
