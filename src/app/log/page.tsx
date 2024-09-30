import Header from "@/app/components/header/header";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Log() {
  return (
    <>
      <Header title="Log" icon={faCog} />
      <div>Log</div>
    </>
  );
}
