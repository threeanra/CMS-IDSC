"use client";
import Header from "@/app/components/header/header";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import DataTable from "@/app/components/datatable/datatable";

export default function Pengguna() {
  // const header = [
  //   { key: "name", label: "Nama Fasyankes" },
  //   { key: "type", label: "Tipe" },
  //   { key: "email", label: "Email" },
  //   { key: "status", label: "Status", badgeKey: "status" },
  // ];

  return (
    <>
      <Header title="Pengguna" icon={faUser} />
      <div>Pengguna</div>
      {/* <DataTable data={} headers={} onPageChange={} pageCount={} /> */}
    </>
  );
}
