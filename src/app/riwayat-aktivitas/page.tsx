/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/header/header";
import {
  faCalendarAlt,
  faFile,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "@/app/components/datatable/datatable";
import axiosWithToken from "../lib/axiosWithToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { formatDateTime } from "../lib/date";

export default function RiwayatAktivitas() {
  //Bo Info
  const [dataBoInfo, setDataBoInfo] = useState<any[]>([]);
  const [searchTermBoInfo, setSearchTermBoInfo] = useState<string>("");
  const [currentPageBoInfo, setCurrentPageBoInfo] = useState<number>(1);
  const [totalPagesBoInfo, setTotalPagesBoInfo] = useState<number>(0);

  const [isDateRangePickerOpenBoInfo, setIsDateRangePickerOpenBoInfo] =
    useState(false);
  const [stateBoInfo, setStateBoInfo] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const headerBoInfo = [
    { key: "bisnisOwnerName", label: "Nama Bisnis Owner" },
    { key: "status", label: "Status", badgeKey: "status" },
    { key: "petugas", label: "Petugas" },
    { key: "createdAt", label: "Tanggal Dibuat" },
  ];

  //Legal Doc
  const [dataLegalDoc, setDataLegalDoc] = useState<any[]>([]);
  const [searchTermLegalDoc, setSearchTermLegalDoc] = useState<string>("");
  const [currentPageLegalDoc, setCurrentPageLegalDoc] = useState<number>(1);
  const [totalPagesLegalDoc, setTotalPagesLegalDoc] = useState<number>(0);

  const [isDateRangePickerOpenLegalDoc, setIsDateRangePickerOpenLegalDoc] =
    useState(false);
  const [stateLegalDoc, setStateLegalDoc] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const headerLegalDoc = [
    { key: "bisnisOwnerName", label: "Nama Bisnis Owner" },
    { key: "status", label: "Status", badgeKey: "status" },
    { key: "petugas", label: "Petugas" },
    { key: "createdAt", label: "Tanggal Dibuat" },
  ];

  useEffect(() => {
    // Fetch all data on initial load
    fetchDataBoInfo(currentPageBoInfo, searchTermBoInfo);
  }, [currentPageBoInfo]);

  useEffect(() => {
    // Fetch all data on initial load
    fetchDataLegalDoc(currentPageLegalDoc, searchTermLegalDoc);
  }, [currentPageLegalDoc]);

  //Bo Info purpose
  const fetchDataBoInfo = async (
    page = 1,
    searchTerm = "",
    startDate?: Date,
    endDate?: Date
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search: searchTerm,
        start_date: startDate ? startDate.toISOString().split("T")[0] : "",
        end_date: endDate ? endDate.toISOString().split("T")[0] : "",
      });

      const response = await axiosWithToken(
        `/history-bo-info?${params.toString()}`,
        "GET"
      );

      const newData = response.data.data.map((item: any) => ({
        ...item,
        bisnisOwnerName: item.boInfo?.bisnisOwner?.name || "No info",
        createdAt: formatDateTime(item.created_at) || "No Info",
      }));

      setDataBoInfo(newData);
      setCurrentPageBoInfo(response.data.currentPage);
      setTotalPagesBoInfo(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchBoInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermBoInfo(e.target.value);
    fetchDataBoInfo(1, e.target.value);
  };

  const handlePaginateBoInfo = ({ selected }: { selected: number }) => {
    fetchDataBoInfo(selected + 1, searchTermBoInfo);
  };

  const handleDateRangeChangeBoInfo = (item: any) => {
    setStateBoInfo([item.selection]);

    // Fetch data based on the selected date range
    const { startDate, endDate } = item.selection;
    const startUTC = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    );
    const endUTC = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    );

    fetchDataBoInfo(1, searchTermBoInfo, startUTC, endUTC);
  };

  const handleDateRangeToggleBoInfo = () => {
    setIsDateRangePickerOpenBoInfo(!isDateRangePickerOpenBoInfo);
  };

  //Legal Doc purpose
  const fetchDataLegalDoc = async (
    page = 1,
    searchTerm = "",
    startDate?: Date,
    endDate?: Date
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search: searchTerm,
        start_date: startDate ? startDate.toISOString().split("T")[0] : "",
        end_date: endDate ? endDate.toISOString().split("T")[0] : "",
      });

      const response = await axiosWithToken(
        `/history-legal-doc?${params.toString()}`,
        "GET"
      );

      const newData = response.data.data.map((item: any) => ({
        ...item,
        bisnisOwnerName: item.boInfo?.bisnisOwner?.name || "No info",
        createdAt: formatDateTime(item.created_at),
      }));

      setDataLegalDoc(newData);
      setCurrentPageLegalDoc(response.data.currentPage);
      setTotalPagesLegalDoc(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchLegalDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLegalDoc(e.target.value);
    fetchDataLegalDoc(1, e.target.value);
  };

  const handlePaginateLegalDoc = ({ selected }: { selected: number }) => {
    fetchDataLegalDoc(selected + 1, searchTermLegalDoc);
  };

  const handleDateRangeChangeLegalDoc = (item: any) => {
    setStateLegalDoc([item.selection]);

    // Fetch data based on the selected date range
    const { startDate, endDate } = item.selection;
    const startUTC = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    );
    const endUTC = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    );

    fetchDataLegalDoc(1, searchTermLegalDoc, startUTC, endUTC);
  };

  const handleDateRangeToggleLegalDoc = () => {
    setIsDateRangePickerOpenLegalDoc(!isDateRangePickerOpenLegalDoc);
  };

  return (
    <>
      <div className="pb-24">
        <Header title="Informasi Bisnis Owner" icon={faFile} />
        <div className="flex flex-col gap-2 shadow-md p-5 pb-7">
          <div className="flex justify-between">
            <div className="relative">
              <button
                type="button"
                onClick={handleDateRangeToggleBoInfo}
                className="btn btn-sm bg-primary hover:bg-primary rounded-md text-white"
              >
                <FontAwesomeIcon
                  icon={isDateRangePickerOpenBoInfo ? faTimes : faCalendarAlt}
                />
                {isDateRangePickerOpenBoInfo
                  ? "Tutup Tanggal"
                  : "Pilih Tanggal"}
              </button>
              {isDateRangePickerOpenBoInfo && (
                <div
                  className="absolute top-full mt-2 z-10"
                  style={{ zIndex: 9999 }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateRangeChangeBoInfo}
                    moveRangeOnFirstSelection={false}
                    ranges={stateBoInfo}
                  />
                </div>
              )}
            </div>
            <input
              value={searchTermBoInfo}
              onChange={handleSearchBoInfo}
              placeholder="Search..."
              className="input input-sm input-bordered rounded-md mb-1"
            />
          </div>
          <hr />
          <DataTable
            data={dataBoInfo}
            headers={headerBoInfo}
            context="badgeString"
            onPageChange={handlePaginateBoInfo}
            pageCount={totalPagesBoInfo}
          />
        </div>
        <div className="mt-10">
          <Header title="Dokumen Legal" icon={faFile} />
          <div className="flex flex-col gap-2 shadow-md p-5 pb-7">
            <div className="flex justify-between">
              <div className="relative">
                <button
                  type="button"
                  onClick={handleDateRangeToggleLegalDoc}
                  className="btn btn-sm bg-primary hover:bg-primary rounded-md text-white"
                >
                  <FontAwesomeIcon
                    icon={
                      isDateRangePickerOpenLegalDoc ? faTimes : faCalendarAlt
                    }
                  />
                  {isDateRangePickerOpenLegalDoc
                    ? "Tutup Tanggal"
                    : "Pilih Tanggal"}
                </button>
                {isDateRangePickerOpenLegalDoc && (
                  <div
                    className="absolute top-full mt-2 z-10"
                    style={{ zIndex: 9999 }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleDateRangeChangeLegalDoc}
                      moveRangeOnFirstSelection={false}
                      ranges={stateLegalDoc}
                    />
                  </div>
                )}
              </div>
              <input
                value={searchTermLegalDoc}
                onChange={handleSearchLegalDoc}
                placeholder="Search..."
                className="input input-sm input-bordered rounded-md mb-1"
              />
            </div>
            <hr />
            <DataTable
              data={dataLegalDoc}
              headers={headerLegalDoc}
              context="badgeString"
              onPageChange={handlePaginateLegalDoc}
              pageCount={totalPagesLegalDoc}
            />
          </div>
        </div>
      </div>
    </>
  );
}
