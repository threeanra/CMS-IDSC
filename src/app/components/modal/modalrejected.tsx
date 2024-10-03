import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

interface ModalRejectedProps {
  title: string;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalRejected({
  title,
  onClose,
  onSubmit,
  reason,
  setReason,
}: ModalRejectedProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

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
      onSubmit(reason); // Submit the selected reason
    }
  };

  return (
    <dialog ref={modalRef} className="modal pr-3">
      <div className="modal-box flex flex-col justify-between">
        {/* Modal Title */}
        <div className="bg-primary mb-5 rounded-lg p-5 flex text-lg content-center items-center gap-3 text-white">
          <FontAwesomeIcon icon={faFile} />
          <span>{title}</span>
        </div>

        {/* Modal Content, Textarea */}
        <textarea
          placeholder="Berikan alasan khusus..."
          className="textarea resize-none w-full textarea-bordered rounded-md textarea-primary h-[200px]"
          value={reason}
          onChange={(e) => setReason(e.target.value)} // Update reason
        />

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        {/* Action Buttons */}
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
