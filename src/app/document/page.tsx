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
import { useSession } from "next-auth/react";
import axios from "axios";
import InputLink from "@/app/components/inputlink/inputlink";
import { CenterAlert } from "../components/alert/alert";

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

    if (status !== "approved") {
      return (
        <div className="flex justify-end gap-2 flex-col md:flex-row mb-3">
          <Button
            title="Revisi"
            size="md"
            onClick={() =>
              openModal("Alasan untuk ditinjau (Bisnis Owner Info)")
            }
          />
          {!isWaitingButtonBoInfoClicked && status !== "on review" && (
            <Button
              color="neutral"
              title="Menunggu"
              size="md"
              onClick={() => {
                handleReviewOrRejectOrPending(
                  selectedItem?.boInfos?.id!,
                  "on review",
                  "boInfo"
                );
                setIsWaitingButtonBoInfoClicked(true); // Tandai tombol telah ditekan
              }}
            />
          )}
          <Button
            color="error"
            title="Tolak"
            size="md"
            onClick={() =>
              openModal("Alasan untuk ditolak (Bisnis Owner Info)")
            }
          />
          <Button
            color="success"
            title="Setujui"
            size="md"
            onClick={() =>
              CenterAlert("question", () =>
                handleReviewOrRejectOrPending(
                  selectedItem?.boInfos?.id!,
                  "approved",
                  "boInfo"
                )
              )
            }
          />
        </div>
      );
    }
    return null;
  };

  const renderLegalDokumenButtons = () => {
    const status = selectedItem?.legalDokumen?.status;

    if (status !== "approved") {
      return (
        <div className="flex justify-end gap-2 flex-col md:flex-row mb-3">
          <Button
            title="Revisi"
            size="md"
            onClick={() => openModal("Alasan untuk ditinjau (Dokumen Legal)")}
          />
          {!isWaitingButtonBoInfoClicked && status !== "on review" && (
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
            onClick={() => openModal("Alasan untuk ditolak (Dokumen Legal)")}
          />
          <Button
            color="success"
            title="Setujui"
            size="md"
            onClick={() =>
              CenterAlert("question", () =>
                handleReviewOrRejectOrPending(
                  selectedItem?.legalDokumen?.id!,
                  "approved",
                  "legalDoc"
                )
              )
            }
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

  const openModal = (title: string) => {
    setModalTitle(title);
    setShowModal(true);
  };

  const handleReviewOrRejectOrPending = async (
    id: number,
    status: string,
    type: "boInfo" | "legalDoc"
  ) => {
    try {
      const url =
        type === "boInfo"
          ? `/bo-infos/${id}/status`
          : `/legal-dokumen/${id}/status`;
      await axiosWithToken(url, "PUT", { status, reason });
      setShowModal(false);
      setStep(0);
    } catch (error) {
      console.error("Error updating status with reason:", error);
    }
  };

  const handleViewDetails = (item: BusinessOwner) => {
    setSelectedItem(item);
    setStep(1);
  };

  const handleModalSubmit = (status: string) => {
    const type = modalTitle.includes("Dokumen Legal") ? "legalDoc" : "boInfo";
    handleReviewOrRejectOrPending(selectedItem?.id!, status, type);
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
      {showModal && (
        <Modal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onSubmit={() =>
            handleModalSubmit(
              modalTitle.includes("ditolak") ? "rejected" : "pending"
            )
          }
          reason={reason}
          setReason={setReason}
        />
      )}
    </>
  );
}
