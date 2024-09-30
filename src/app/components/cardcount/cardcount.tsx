import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CardCountProps {
  title: string;
  total: number | string; // Adjust type based on expected input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any; // Type for FontAwesome icons
}

export default function CardCount(props: CardCountProps) {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-10 items-center">
            <div>
              <FontAwesomeIcon
                icon={props.icon}
                className="text-4xl text-primary"
              />
            </div>
            <div>
              <h5 className="font-bold">{props.title}</h5>
              <p>{props.total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
