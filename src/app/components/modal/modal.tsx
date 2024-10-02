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
}

export default function Modal({
  title,
  onClose,
  onSubmit,
  reason,
  setReason,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(""); // State for error message
  const [selectedReasons, setSelectedReasons] = React.useState<
    { value: string; label: string }[]
  >([]); // State for selected reasons
  const [activeOption, setActiveOption] = React.useState<string>("Select");

  // Options for reasons (can be expanded with real reasons)
  const options = [
    { value: "Dokumen tidak lengkap", label: "Dokumen tidak lengkap" },
    { value: "Alamat tidak valid", label: "Alamat tidak valid" },
    { value: "Email salah", label: "Email salah" },
    { value: "Nomor telepon tidak aktif", label: "Nomor telepon tidak aktif" },
  ];

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
      setErrorMessage("Alasan custom tidak boleh kosong");
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
      <div className="modal-box custom-modal-height flex flex-col justify-between">
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
            Select
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
            />
          ) : (
            <textarea
              placeholder="Berikan alasan custom"
              className="textarea resize-none w-full textarea-bordered rounded-md textarea-primary h-[200px]"
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
