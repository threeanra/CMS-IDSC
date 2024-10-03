/* eslint-disable @typescript-eslint/no-explicit-any */
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from "react";
import Select from "react-select";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (selectedReasons: string) => void;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  modalType: "boInfo" | "docLegal"; // New prop to determine modal type
}

export default function Modal({
  title,
  onClose,
  onSubmit,
  reason,
  setReason,
  modalType,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(""); // State for error message
  const [selectedReasons, setSelectedReasons] = React.useState<
    { value: string; label: string }[]
  >([]); // State for selected reasons
  const [activeOption, setActiveOption] = React.useState<string>("Select");

  // Options for reasons (can be expanded with real reasons)
  const optionsBoInfo = [
    {
      value: "Nama Bisnis Owner tidak sesuai",
      label: "Nama Bisnis Owner tidak sesuai",
    },
    {
      value: "Nama Bisnis Owner terdapat simbol",
      label: "Nama Bisnis Owner terdapat simbol",
    },
    { value: "Nama Bisnis tidak sesuai", label: "Nama Bisnis tidak sesuai" },
    {
      value: "Nama Bisnis terdapat simbol",
      label: "Nama Bisnis terdapat simbol",
    },
    {
      value: "Nama Bisnis tidak sesuai",
      label: "Nama Bisnis tidak sesuai",
    },
    {
      value: "Email tidak valid",
      label: "Email tidak valid",
    },
    {
      value: "Format email salah",
      label: "Format email salah",
    },
    {
      value: "Telepon tidak valid",
      label: "Telepon tidak valid",
    },
    {
      value: "Telepon tidak sesuai standar",
      label: "Telepon tidak sesuai standar",
    },
    {
      value: "Nomor handphone tidak dapat dihubungi",
      label: "Nomor handphone tidak dapat dihubungi",
    },
    {
      value: "Nomor handphone tidak valid",
      label: "Nomor handphone tidak valid",
    },
    {
      value: "Nomor handphone tidak sesuai standar",
      label: "Nomor handphone tidak sesuai standar",
    },
    {
      value: "Nomor handphone tidak dapat dihubungi",
      label: "Nomor handphone tidak dapat dihubungi",
    },
    {
      value: "Nomor handphone tidak valid",
      label: "Nomor handphone tidak valid",
    },
    {
      value: "Alamat tidak sesuai",
      label: "Alamat tidak sesuai",
    },
    {
      value: "Alamat tidak valid",
      label: "Alamat tidak valid",
    },
  ];

  const optionsDocLegal = [
    {
      value: "KTP palsu atau tidak terverifikasi",
      label: "KTP palsu atau tidak terverifikasi",
    },
    {
      value: "Dokumen tidak lengkap atau tidak jelas",
      label: "Dokumen tidak lengkap atau tidak jelas",
    },
    {
      value: "Akta tidak asli atau terdapat tanda-tanda pemalsuan",
      label: "Akta tidak asli atau terdapat tanda-tanda pemalsuan",
    },
    {
      value: "Dokumen tidak sah",
      label: "Dokumen tidak sah",
    },
    {
      value: "Akta tidak valid/palsu",
      label: "Akta tidak valid/palsu",
    },
    {
      value: "Dokumen palsu atau tidak terdaftar",
      label: "Dokumen palsu atau tidak terdaftar",
    },
    {
      value: "SK sudah tidak berlaku atau kedaluwarsa",
      label: "SK sudah tidak berlaku atau kedaluwarsa",
    },
    {
      value: "Informasi dalam SK tidak sesuai",
      label: "Informasi dalam SK tidak sesuai",
    },
    {
      value: "Dokumen NPWP tidak jelas",
      label: "Dokumen NPWP tidak jelas",
    },
    {
      value: "NPWP sudah tidak aktif",
      label: "NPWP sudah tidak aktif",
    },
    {
      value: "Terdapat perbedaan informasi",
      label: "Terdapat perbedaan informasi",
    },
    {
      value: "NIB tidak valid atau palsu.",
      label: "NIB tidak valid atau palsu.",
    },
    {
      value: "Dokumen NIB tidak jelas atau buram",
      label: "Dokumen NIB tidak jelas atau buram",
    },
    {
      value: "Informasi NIB tidak sesuai",
      label: "Informasi NIB tidak sesuai",
    },
    {
      value: "Sertifikat ISO sudah kedaluwarsa",
      label: "Sertifikat ISO sudah kedaluwarsa",
    },
    {
      value: "Nomor sertifikat tidak valid",
      label: "Nomor sertifikat tidak valid",
    },
    {
      value: "Sertifikat ISO tidak sesuai",
      label: "Sertifikat ISO tidak sesuai",
    },
  ];

  // Choose options based on modal type
  const options = modalType === "boInfo" ? optionsBoInfo : optionsDocLegal;

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    onClose();
  };

  const handleSubmit = () => {
    const isSelect = activeOption === "Select";

    if (isSelect && selectedReasons.length === 0) {
      setErrorMessage("Alasan tidak boleh kosong");
    } else if (!isSelect && reason.trim() === "") {
      setErrorMessage("Alasan khusus tidak boleh kosong");
    } else {
      const reasons = isSelect
        ? selectedReasons.map((option) => option.value).join(", ")
        : reason;

      setErrorMessage("");
      onSubmit(reasons); // Ensure 'reasons' is correctly formed
    }
  };

  const handleToggle = (option: string) => {
    setActiveOption(option);
    setSelectedReasons([]);
    setReason("");
  };

  return (
    <dialog ref={modalRef} className="modal pr-3">
      <div className="modal-box h-[700px] flex flex-col justify-between">
        {/* Judul modal */}
        <div className="bg-primary mb-5 rounded-lg p-5 flex text-lg content-center items-center gap-3 text-white ">
          <FontAwesomeIcon icon={faFile} />
          <span>{title}</span>
        </div>

        {/* Tombol Select dan Masukkan Pesan Khusus */}
        <div className="flex bg-gray-200 rounded-md w-full p-3">
          <button
            onClick={() => handleToggle("Select")}
            className={`py-2 px-4 w-full text-black transition-all duration-300 rounded-md 
          ${activeOption === "Select" ? "bg-white shadow" : ""}`}
          >
            Pilih
          </button>
          <button
            onClick={() => handleToggle("Masukkan Pesan Khusus")}
            className={`py-2 px-4 w-full text-black transition-all duration-300 rounded-md 
          ${activeOption === "Masukkan Pesan Khusus" ? "bg-white shadow" : ""}`}
          >
            Masukkan Pesan Khusus
          </button>
        </div>

        {/* Konten modal, Select atau Textarea */}
        <div className="flex-grow mt-4">
          {activeOption === "Select" ? (
            <Select
              isMulti
              name="reasons"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedReasons} // Bind selected reasons to state
              onChange={(selectedOptions) =>
                setSelectedReasons(selectedOptions as any)
              } // Update selected reasons
              placeholder="Pilih alasan..."
            />
          ) : (
            <textarea
              placeholder="Berikan alasan khusus..."
              className="textarea resize-none w-full textarea-bordered rounded-md textarea-primary h-[350px]"
              value={reason}
              onChange={(e) => setReason(e.target.value)} // Update reason
            />
          )}

          {/* Pesan Error */}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p> // Display error message
          )}
        </div>

        {/* Tombol Aksi (Kirim & Keluar) */}
        <div className="modal-action mt-4 flex justify-end">
          <button
            className="btn bg-primary hover:bg-primary text-white rounded-md"
            onClick={handleSubmit} // Trigger validation and submission
          >
            Kirim
          </button>
          <button
            type="button"
            className="btn bg-error hover:bg-error text-white rounded-md"
            onClick={handleClose}
          >
            Keluar
          </button>
        </div>
      </div>
    </dialog>
  );
}
