import React, { useRef, useEffect } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
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
    if (reason.trim() === "") {
      setErrorMessage("Alasan tidak boleh kosong");
    } else {
      setErrorMessage("");
      onSubmit();
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h1 className="font-bold text-lg">{title}</h1>
        <textarea
          placeholder="Berikan alasan"
          className="mt-5 textarea resize-none w-full textarea-bordered rounded-md textarea-primary textarea-md h-[180px]"
          value={reason}
          required
          onChange={(e) => setReason(e.target.value)} // Update reason
        />
        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p> // Display error message
        )}
        <div className="modal-action">
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
