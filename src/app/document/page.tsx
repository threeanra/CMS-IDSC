/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { faArrowLeft, faFile } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/components/header/header";
import DataTable from "@/app/components/datatable/datatable";
import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import TextArea from "@/app/components/textarea/textarea";
import Modal from "@/app/components/modal/modalrevision";
import ModalRejected from "@/app/components/modal/modalrejected";
import axiosWithToken from "@/app/lib/axiosWithToken";
import InputLink from "@/app/components/inputlink/inputlink";
import { CenterAlert } from "@/app/components/alert/alert";
import { filterStatusToEnglish, optionsFilterStatus } from "@/app/data/data";
import { useSession } from "next-auth/react";

interface BoInfos {
  id: string | number;
  bisnis_owner_id: number;
  businessId: string;
  businessType: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  mobile: string;
  address: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  postal_code: string;
  status: string;
  reason: string | null;
  created_at: string;
  updated_at: string;
}

interface LegalDokumen {
  id: number;
  bisnis_owner_id: number;
  ktp: string;
  akta: string;
  sk_kemenkumham: string;
  npwp: string;
  nib: string;
  iso: string;
  status: string;
  reason: string | null;
  created_at: string;
  updated_at: string;
}

interface BusinessOwner {
  id: number;
  name: string;
  phone: string;
  email: string;
  email_verified_at: string;
  password: string;
  is_send_email: boolean;
  is_resend: boolean;
  is_first_login: boolean;
  img_profile: string | null;
  is_2fa: boolean;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  boInfos: BoInfos | null;
  legalDokumen: LegalDokumen | null;
}

export default function BoInfo() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BusinessOwner[]>([]);
  const [selectedItem, setSelectedItem] = useState<BusinessOwner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalRejected, setShowModalRejected] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [reason, setReason] = useState<string>("");
  const [waitingBoInfoId, setWaitingBoInfoId] = useState<number | null>(null);
  const [waitingLegalDocId, setWaitingLegalDocId] = useState<number | null>(
    null
  );
  const [statusChanged, setStatusChanged] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const headers = [
    { key: "name", label: "Nama Bisnis Owner" },
    { key: "email", label: "Email" },
    { key: "boInfos", label: "Status Bo Info", badgeKey: "boInfos" },
    { key: "legalDokumen", label: "Status Document", badgeKey: "legalDokumen" },
  ];

  const { data: session } = useSession();

  const PIC = session?.user?.username;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (statusChanged) {
      fetchData();
      setStatusChanged(false);
    }
  }, [filterStatus, searchTerm, statusChanged]);

  const fetchData = async (page = 1, searchTerm = "", filterStatus = "") => {
    try {
      const response = await axiosWithToken(
        `/bisnis-owners?page=${page}&search=${searchTerm}&status=${filterStatus}`,
        "GET"
      );

      setData(response.data.data);
      console.log(response);

      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchData(1, e.target.value);
  };

  const handlePaginate = ({ selected }: { selected: number }) => {
    fetchData(selected + 1);
  };

  const handleFilterStatus = (e: any) => {
    const selectedValue = e.target.value;
    const statusForApi = filterStatusToEnglish[selectedValue];

    // Set the status in state (optional if you don't need to display it)
    setFilterStatus(statusForApi);

    // Fetch data with the selected status immediately
    fetchData(1, "", statusForApi);
  };

  const fullAddress = `
    ${selectedItem?.boInfos?.address?.trim() || ""}, ${
    selectedItem?.boInfos?.village?.trim() || ""
  }, ${selectedItem?.boInfos?.subdistrict?.trim() || ""}, ${
    selectedItem?.boInfos?.city?.trim() || ""
  }, ${selectedItem?.boInfos?.province?.trim() || ""}, ${
    selectedItem?.boInfos?.postal_code?.trim() || ""
  }
  `.trim();

  const renderBoInfoButtons = () => {
    const status = selectedItem?.boInfos?.status;
    const approval = ["approved", "rejected"];

    if (!approval.includes(status as string)) {
      return (
        <div className="flex justify-end gap-2 flex-col md:flex-row mb-3">
          <Button
            title="Revisi"
            size="md"
            onClick={() => {
              openModalRevisi("Alasan untuk ditinjau (Bisnis Owner Info)");
            }}
          />
          {waitingBoInfoId !== selectedItem?.boInfos?.id &&
            status !== "on review" &&
            status !== "pending" &&
            status !== "rejected" && (
              <Button
                color="neutral"
                title="Menunggu"
                size="md"
                onClick={() => {
                  handleReviewOrRejectOrPending(
                    selectedItem?.boInfos?.id! as number,
                    "on review",
                    "boInfo",
                    PIC as string
                  );
                  setWaitingBoInfoId(selectedItem?.boInfos?.id! as number);
                }}
              />
            )}
          <Button
            color="error"
            title="Tolak"
            size="md"
            onClick={() => {
              openModalRejected("Alasan untuk ditolak (Bisnis Owner Info)");
            }}
          />
          <Button
              color="success"
              title="Setujui"
              size="md"
              onClick={() => {
                CenterAlert(
                    "question",
                    () => {
                      handleReviewOrRejectOrPending(
                          selectedItem?.boInfos?.id! as number,
                          "approved",
                          "boInfo",
                          PIC as string
                      );
                    },
                    () => {
                      setWaitingBoInfoId(selectedItem?.boInfos?.id! as number); // Hide Revisi button
                    }
                );
              }}
          />
        </div>
      );
    }
    return null;
  };

  const renderLegalDokumenButtons = () => {
    const status = selectedItem?.legalDokumen?.status;
    const approval = ["approved", "rejected"];

    if (!approval.includes(status as string)) {
      return (
        <div className="flex justify-end gap-2 flex-col md:flex-row mb-3">
          <Button
            title="Revisi"
            size="md"
            onClick={() => {
              openModalRevisi("Alasan untuk ditinjau (Dokumen Legal)");
            }}
          />
          {waitingLegalDocId !== selectedItem?.legalDokumen?.id &&
            status !== "on review" &&
            status !== "pending" &&
            status !== "rejected" && (
              <Button
                color="neutral"
                title="Menunggu"
                size="md"
                onClick={() => {
                  handleReviewOrRejectOrPending(
                    selectedItem?.legalDokumen?.id!,
                    "on review",
                    "legalDoc",
                    PIC as string
                  );
                  setWaitingLegalDocId(selectedItem?.legalDokumen?.id!);
                }}
              />
            )}
          <Button
            color="error"
            title="Tolak"
            size="md"
            onClick={() => {
              openModalRejected("Alasan untuk ditolak (Dokumen Legal)");
            }}
          />
          <Button
              color="success"
              title="Setujui"
              size="md"
              onClick={() => {
                CenterAlert(
                    "question",
                    () => {
                      handleReviewOrRejectOrPending(
                          selectedItem?.legalDokumen?.id!,
                          "approved",
                          "legalDoc",
                          PIC as string
                      );
                    },
                    () => {
                      setWaitingLegalDocId(selectedItem?.legalDokumen?.id!); // Hide Revisi button
                    }
                );
              }}
          />
        </div>
      );
    }
    return null;
  };

  const renderDokumenLegal = () => {
    const dokumen = selectedItem?.legalDokumen;
    const businessType = selectedItem?.boInfos?.businessType;

    if (!dokumen) {
      return (
        <div className="text-center">Bisnis Owner belum upload dokumen</div>
      );
    }

    return (
      <>
        {businessType === "Perusahaan" && (
          <>
            {dokumen.ktp && (
              <InputLink
                label="KTP Direktur Berdasarkan Akta"
                link={dokumen.ktp}
              />
            )}

            {dokumen.akta && (
              <InputLink label="Akta Perusahaan" link={dokumen.akta} />
            )}
            {dokumen.sk_kemenkumham && (
              <InputLink label="SK Kemenkumham" link={dokumen.sk_kemenkumham} />
            )}
            {dokumen.npwp && <InputLink label="NPWP" link={dokumen.npwp} />}
            {dokumen.nib && <InputLink label="NIB" link={dokumen.nib} />}
            {dokumen.iso && <InputLink label="ISO" link={dokumen.iso} />}
            {renderLegalDokumenButtons()}
          </>
        )}
        {businessType === "Perorangan" && (
          <>
            {dokumen.ktp && <InputLink label="KTP" link={dokumen.ktp} />}
            {dokumen.npwp && <InputLink label="NPWP" link={dokumen.npwp} />}
            {dokumen.iso && <InputLink label="ISO" link={dokumen.iso} />}
            {renderLegalDokumenButtons()}
          </>
        )}
      </>
    );
  };

  const handleReviewOrRejectOrPending = async (
    id: number,
    status: string,
    type: "boInfo" | "legalDoc",
    petugas: string,
    reasons?: string | null
  ) => {
    try {
      const url =
        type === "boInfo"
          ? `/bo-infos/${id}/status`
          : `/legal-dokumen/${id}/status`;

      // Update status untuk boInfo atau legalDokumen sesuai dengan tipe yang diberikan
      await axiosWithToken(url, "PUT", {
        status,
        reason: reasons,
        petugas: petugas,
      });

      // Jika bisnis owner ditolak, perbarui juga status dokumen legal menjadi "rejected"
      if (
        type === "boInfo" &&
        status === "rejected" &&
        selectedItem?.legalDokumen?.id
      ) {
        await axiosWithToken(
          `/legal-dokumen/${selectedItem.legalDokumen.id}/status`,
          "PUT",
          {
            status: "rejected",
            reason: "Ditolak karena bisnis owner ditolak",
          }
        );
      }

      setShowModal(false);
      setShowModalRejected(false);
      setStep(0);
      setStatusChanged(true);
    } catch (error) {
      console.error("Error updating status with reason:", error);
    }
  };

  // Fungsi untuk memunculkan modal revisi
  const openModalRevisi = (title: string) => {
    setModalTitle(title);
    setShowModal(true); // Memunculkan modal revisi
  };

  // Fungsi untuk memunculkan modal tolak
  const openModalRejected = (title: string) => {
    setModalTitle(title);
    setShowModalRejected(true); // Memunculkan modal tolak
  };

  const handleViewDetails = (item: BusinessOwner) => {
    setSelectedItem(item);
    setStep(1);
  };

  // Fungsi submit untuk modal revisi
  const handleModalSubmit = async (status: string, reasons?: string) => {
    const type = modalTitle.includes("Dokumen Legal") ? "legalDoc" : "boInfo";
    const id =
      type === "legalDoc"
        ? selectedItem?.legalDokumen?.id
        : selectedItem?.boInfos?.id;

    await handleReviewOrRejectOrPending(
      id as number,
      status,
      type,
      reasons as string,
      PIC as string
    );

    // Reset waiting ID setelah submit berhasil
    if (type === "legalDoc") {
      setWaitingLegalDocId(null);
    } else {
      setWaitingBoInfoId(null);
    }

    // Tutup modal dan reset reason setelah submit
    setShowModal(false);
    setReason("");
  };

  // Reset state setelah modal ditutup
  useEffect(() => {
    if (!showModal) {
      setWaitingBoInfoId(null);
      setWaitingLegalDocId(null);
    }
  }, [showModal]);

  return (
    <>
      <Header title="Bisnis Owner Info" icon={faFile} />
      <div className="pb-4">
        {step === 0 ? (
          <div className="flex flex-col gap-2 shadow-md p-5 pb-7">
            <div className="flex justify-between">
              <select
                className="select select-sm border-gray-300 text-gray-500"
                onChange={handleFilterStatus}
              >
                {optionsFilterStatus.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              <input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari..."
                className="input input-sm input-bordered rounded-md mb-1"
              />
            </div>
            <hr />
            <DataTable
              context="badgeString"
              data={data}
              onViewDetails={handleViewDetails}
              pageCount={totalPages}
              onPageChange={handlePaginate}
              headers={headers}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Button
              width={130}
              title="Kembali"
              size="md"
              icon={faArrowLeft}
              onClick={() => setStep(0)}
            />
            {selectedItem && selectedItem.boInfos && (
              <>
                <Input
                  type="text"
                  label="Nama Bisnis Owner"
                  value={selectedItem.name}
                />
                <Input
                  type="text"
                  label="Tipe Bisnis"
                  value={selectedItem.boInfos.businessType}
                />
                <Input
                  type="text"
                  label="Nama Bisnis"
                  value={selectedItem.boInfos.businessName}
                />
                <Input
                  type="text"
                  label="Email Bisnis"
                  value={selectedItem.boInfos.businessEmail}
                />
                <Input
                  type="text"
                  label="Telepon"
                  value={selectedItem.boInfos.phone}
                />
                <Input
                  type="text"
                  label="Nomor HP"
                  value={selectedItem.boInfos.mobile}
                />
                <TextArea label="Alamat" value={fullAddress} />
                {renderBoInfoButtons()}
              </>
            )}
            <Header title="Dokumen Legal" icon={faFile} />
            {renderDokumenLegal()}
          </div>
        )}
      </div>

      {/* Modal Revisi */}
      {showModal && (
        <Modal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onSubmit={(reasons) => {
            handleModalSubmit(
              modalTitle.includes("ditolak") ? "rejected" : "pending",
              reasons
            );
          }}
          reason={reason}
          setReason={setReason}
          modalType={
            modalTitle.includes("Dokumen Legal") ? "docLegal" : "boInfo"
          }
        />
      )}
      {/* Modal Tolak */}
      {showModalRejected && (
        <ModalRejected
          title={modalTitle}
          onClose={() => setShowModalRejected(false)}
          onSubmit={(reasons) => {
            handleModalSubmit("rejected", reasons);
          }} // Kirim alasan penolakan
          reason={reason}
          setReason={setReason}
        />
      )}
    </>
  );
}
