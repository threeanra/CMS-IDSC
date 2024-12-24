/* eslint-disable @next/next/no-img-element */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div className="flex justify-between mx-10 mt-10 mb-7">
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-primary text-white hover:bg-secondary drawer-button lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
      <div className="flex align-middle content-center items-center gap-3">
        <h5 className="text-right font-bold">
          Hello, {session?.user?.username}
        </h5>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
