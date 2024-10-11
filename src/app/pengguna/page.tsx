/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "@/app/components/header/header";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axiosWithToken from "@/app/lib/axiosWithToken";
import DataTable from "@/app/components/datatable/datatable";
import {
  filterStatusToEnglishFasyankes,
  optionsFilterStatusFasyankes,
} from "@/app/data/data";
import Modal from "@/app/components/modal/modal"; // Import Modal

export default function Pengguna() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState<boolean>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const header = [
    { key: "name", label: "Nama Fasyankes" },
    { key: "type", label: "Tipe" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", badgeKey: "is_active" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(currentPage, searchTerm, filterStatus);
  }, [filterStatus, searchTerm, currentPage]); // Added currentPage to dependencies

  const fetchData = async (
    page = currentPage, // Use currentPage by default
    searchTerm = "",
    filterStatus?: boolean // Filter status is optional
  ) => {
    try {
      // Prepare query params
      let params = `fasyankes?page=${page}&search=${searchTerm}`;

      // Add filterStatus to params if available
      if (filterStatus !== undefined) {
        params += `&is_active=${filterStatus}`;
      }

      const response = await axiosWithToken(params, "GET");

      setData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchData(1, e.target.value, filterStatus); // Keep current filter status
  };

  const handlePaginate = ({ selected }: { selected: number }) => {
    fetchData(selected + 1, "", filterStatus);
  };

  const handleFilterStatus = (e: any) => {
    const selectedValue = e.target.value;
    const statusForApi = filterStatusToEnglishFasyankes[selectedValue];

    setFilterStatus(statusForApi);
    fetchData(1, searchTerm, statusForApi); // Fetch with the new filter status
  };

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(item);
  };

  return (
    <>
      <Header title="Pengguna" icon={faUser} />
      <div className="flex flex-col gap-2 shadow-md p-5 pb-7">
        <div className="flex justify-between">
          <select
            className="select select-sm border-gray-300 text-gray-500"
            onChange={handleFilterStatus}
          >
            {optionsFilterStatusFasyankes.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="input input-sm input-bordered rounded-md mb-1"
          />
        </div>
        <hr />
        <DataTable
          context="badgeBoolean"
          data={data}
          headers={header}
          onPageChange={handlePaginate}
          pageCount={totalPages}
          onViewDetails={handleViewDetails}
        />
      </div>
      {isModalOpen && selectedItem && (
        <Modal
          title="Detail Fasyankes"
          accessFasyankes={selectedItem.accessFasyankes}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
