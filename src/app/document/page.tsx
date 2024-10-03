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
import Modal from "@/app/components/modal/modal";
import ModalRejected from "@/app/components/modal/modalrejected";
import { useSession } from "next-auth/react";
import axios from "axios";
import InputLink from "@/app/components/inputlink/inputlink";
import { CenterAlert } from "@/app/components/alert/alert";

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
  const [showModal, setShowModal] = useState(false); // State untuk Modal Revisi
  const [showModalRejected, setShowModalRejected] = useState(false); // State untuk Modal Tolak
  const [modalTitle, setModalTitle] = useState("");
  const [reason, setReason] = useState<string>("");
  const [isWaitingButtonBoInfoClicked, setIsWaitingButtonBoInfoClicked] =
    useState(false);
  const [isWaitingButtonLegalDocClicked, setIsWaitingButtonLegalDocClicked] =
    useState(false);

  const { data: session } = useSession();
  const token = session?.user?.token;

  const axiosWithToken = (url: string, method: string, body: object = {}) => {
    if (!token) {
      throw new Error("Token tidak ditemukan");
    }
    return axios({
      method,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithToken("/bisnis-owners/", "GET");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [token, step]);

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
              setIsWaitingButtonBoInfoClicked(true);
            }}
          />
          {!isWaitingButtonBoInfoClicked && status !== "on review" && (
            <Button
              color="neutral"
              title="Menunggu"
              size="md"
              onClick={() => {
                handleReviewOrRejectOrPending(
                  selectedItem?.boInfos?.id! as number,
                  "on review",
                  "boInfo"
                );
                setIsWaitingButtonBoInfoClicked(true);
              }}
            />
          )}
          <Button
            color="error"
            title="Tolak"
            size="md"
            onClick={() => {
              openModalRejected("Alasan untuk ditolak (Bisnis Owner Info)");
              setIsWaitingButtonBoInfoClicked(true);
            }}
          />
          <Button
            color="success"
            title="Setujui"
            size="md"
            onClick={() => {
              CenterAlert("question", () =>
                handleReviewOrRejectOrPending(
                  selectedItem?.boInfos?.id! as number,
                  "approved",
                  "boInfo"
                )
              );
              setIsWaitingButtonBoInfoClicked(true);
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
              setIsWaitingButtonLegalDocClicked(true);
            }}
          />
          {!isWaitingButtonLegalDocClicked && status !== "on review" && (
            <Button
              color="neutral"
              title="Menunggu"
              size="md"
              onClick={() => {
                handleReviewOrRejectOrPending(
                  selectedItem?.legalDokumen?.id!,
                  "on review",
                  "legalDoc"
                );
                setIsWaitingButtonLegalDocClicked(true);
              }}
            />
          )}
          <Button
            color="error"
            title="Tolak"
            size="md"
            onClick={() => {
              openModalRejected("Alasan untuk ditolak (Dokumen Legal)");
              setIsWaitingButtonLegalDocClicked(true);
            }}
          />
          <Button
            color="success"
            title="Setujui"
            size="md"
            onClick={() => {
              CenterAlert("question", () =>
                handleReviewOrRejectOrPending(
                  selectedItem?.legalDokumen?.id!,
                  "approved",
                  "legalDoc"
                )
              );
              setIsWaitingButtonLegalDocClicked(true);
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
    reasons?: string | null // alasan yang dipilih atau custom dari modal
  ) => {
    try {
      const url =
        type === "boInfo"
          ? `/bo-infos/${id}/status`
          : `/legal-dokumen/${id}/status`;
      await axiosWithToken(url, "PUT", { status, reason: reasons });
      setShowModal(false);
      setShowModalRejected(false);
      setStep(0);
      console.log({
        status: status,
        reason: reasons,
      });
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

  const handleModalSubmit = (status: string, reasons?: string) => {
    const type = modalTitle.includes("Dokumen Legal") ? "legalDoc" : "boInfo";
    handleReviewOrRejectOrPending(selectedItem?.id!, status, type, reasons); // kirim alasan ke fungsi
  };
  return (
    <>
      <Header title="Bisnis Owner Info" icon={faFile} />
      <div className="pb-10">
        {step === 0 ? (
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">Informasi Bisnis Owner</div>
            <DataTable data={data} onViewDetails={handleViewDetails} />
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
          onSubmit={(reasons) =>
            handleModalSubmit(
              modalTitle.includes("ditolak") ? "rejected" : "pending",
              reasons
            )
          } // Kirim alasan yang dipilih dari modal
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
