import Header from "@/app/components/header/header";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function BisnisOwner() {
  return (
    <>
      <Header title="Master Obat" icon={faUsers} />
      <div>BisnisOwner</div>
    </>
  );
}
