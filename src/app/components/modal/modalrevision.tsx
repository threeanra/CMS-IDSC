/* eslint-disable @typescript-eslint/no-explicit-any */
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from "react";
import Select from "react-select";
import { optionsBoInfo, optionsDocLegal } from "@/app/data/data";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (selectedReasons: string) => void;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  modalType: "boInfo" | "docLegal";
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

  const options = modalType === "boInfo" ? optionsBoInfo : optionsDocLegal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault(); // Prevent the default behavior of the Escape key
        onClose(); // Call onClose to close the modal
      }
    };

    if (modalRef.current) {
      modalRef.current.showModal();
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.close();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
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
              value={selectedReasons}
              onChange={(selectedOptions) =>
                setSelectedReasons(selectedOptions as any)
              }
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
