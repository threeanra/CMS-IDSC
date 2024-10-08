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

// Function to map status to badge type and title in Indonesian
const getBadgeInfo = (status: string): { type: BadgeType; title: string } => {
  switch (status) {
    case "approved":
      return { type: "success", title: "Disetujui" };
    case "on review":
      return { type: "warning", title: "Ditinjau" };
    case "rejected":
      return { type: "error", title: "Ditolak" };
    case "pending":
      return { type: "secondary", title: "Perbaikan" };
    default:
      return { type: "neutral", title: "Terdaftar" };
  }
};

// DataTable component that receives data and pagination logic as props
export default function DataTable({
  data = [],
  pageCount,
  onPageChange,
  onViewDetails,
}: any) {
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
          {data.length > 0 ? (
            data.map((item: any, index: number) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data available.
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
          previousLinkClassName="p-1 px-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center "
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
