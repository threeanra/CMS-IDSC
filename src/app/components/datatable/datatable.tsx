/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@/app/components/badge/badge"; // Adjust the path
import Button from "@/app/components/button/button"; // Adjust the path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

// Define types for the allowed badge types
type BadgeType =
  | "neutral"
  | "accent"
  | "secondary"
  | "success"
  | "warning"
  | "error";

type HeaderType = {
  key: string;
  label: string;
  badgeKey?: string; // Optional key for badge rendering
};

const getBadgeInfo = (
  status: string | boolean | null,
  context: "boInfo" | "pengguna"
): { type: BadgeType; title: string } => {
  if (context === "pengguna") {
    return status === true
      ? { type: "success", title: "Aktif" }
      : { type: "neutral", title: "Tidak Aktif" };
  } else {
    switch (status) {
      case "approved":
        return { type: "success", title: "Disetujui" };
      case "on review":
        return { type: "warning", title: "Ditinjau" };
      case "rejected":
        return { type: "error", title: "Ditolak" };
      case "pending":
        return { type: "secondary", title: "Perbaikan" };
      case null:
        return { type: "neutral", title: "No Info" }; // Specific to boInfo when status is null
      default:
        return { type: "neutral", title: "Terdaftar" };
    }
  }
};

export default function DataTable({
  data = [],
  pageCount,
  onPageChange,
  onViewDetails,
  headers = [],
  context, // Add context prop
}: {
  data: any[];
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
  onViewDetails: (item: any) => void;
  headers: HeaderType[];
  context: "boInfo" | "pengguna"; // Specify the context type
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table text-md">
        <thead className="text-md">
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item: any, index: number) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key}>
                    {header.badgeKey ? (
                      <Badge
                        type={
                          getBadgeInfo(
                            item[header.badgeKey]?.status ??
                              item[header.badgeKey],
                            context
                          ).type
                        }
                        title={
                          getBadgeInfo(
                            item[header.badgeKey]?.status ??
                              item[header.badgeKey],
                            context
                          ).title
                        }
                      />
                    ) : (
                      item[header.key] || "No Info"
                    )}
                  </td>
                ))}
                <td>
                  <Button
                    title="Lihat"
                    icon={faEye}
                    size="sm"
                    width={100}
                    disabled={context === "boInfo" && item.boInfos === null}
                    onClick={() => onViewDetails(item)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center">
                Tidak ada data untuk ditampilkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-8 pb-2">
        <ReactPaginate
          previousLabel={
            <div className="h-full w-full">
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </div>
          }
          nextLabel={
            <div className="h-full w-full">
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </div>
          }
          pageCount={pageCount}
          onPageChange={onPageChange}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          breakClassName={"break-me"}
          containerClassName="flex space-x-1 items-center"
          previousLinkClassName="p-1 px-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          nextLinkClassName="p-1 px-2 flex items-center bg-gray-200 rounded hover:bg-gray-300"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeClassName="flex items-center cursor-pointer w-8 h-8 bg-primary text-white rounded"
          pageClassName="flex items-center cursor-pointer w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
          pageLinkClassName="flex items-center justify-center h-full w-full"
        />
      </div>
    </div>
  );
}
