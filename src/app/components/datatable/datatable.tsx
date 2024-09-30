import React from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons"; // Pastikan Anda mengimpor faEye
import Badge from "@/app/components/badge/badge"; // Sesuaikan dengan path komponen Badge Anda
import Button from "@/app/components/button/button"; // Sesuaikan dengan path komponen Button Anda

export default function DataTable({ data = [], onViewDetails }: any) {
  // Function to map status to badge type and title in Indonesian
  const getBadgeInfo = (status: string) => {
    switch (status) {
      case "approved":
        return { type: "success", title: "Disetujui" };
      case "on review":
        return { type: "warning", title: "Ditinjau" };
      case "rejected":
        return { type: "error", title: "Ditolak" };
      default:
        return { type: "neutral", title: "Perbaikan" };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-md">
        <thead className="text-md">
          <tr>
            <th>Nama Bisnis Owner</th>
            <th>Email</th>
            <th>Status Bo Info</th>
            <th>Status Document</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {item.boInfos ? (
                  <Badge
                    type={getBadgeInfo(item.boInfos.status).type}
                    title={getBadgeInfo(item.boInfos.status).title}
                  />
                ) : (
                  "No Info"
                )}
              </td>
              <td>
                {item.legalDokumen ? (
                  <Badge
                    type={getBadgeInfo(item.legalDokumen.status).type}
                    title={getBadgeInfo(item.legalDokumen.status).title}
                  />
                ) : (
                  "No Info"
                )}
              </td>
              <td>
                <Button
                  title="Lihat"
                  icon={faEye}
                  size="sm"
                  width={100}
                  disabled={item.boInfos == null}
                  onClick={() => onViewDetails(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
