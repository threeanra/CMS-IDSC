/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/components/header/header";
import { useEffect, useRef } from "react";
import { formatDate } from "@/app/lib/date";

interface AccessFasyankes {
  username: string;
  role: string;
  created_at: string;
  created_by: string;
}

interface ModalProps {
  title: string;
  onClose: () => void;
  accessFasyankes: AccessFasyankes[];
}

export default function Modal({ title, onClose, accessFasyankes }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        modalRef.current.close();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <dialog ref={modalRef} className="modal" onClick={onClose}>
        <div
          className="modal-box max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Header icon={faEye} title={title} />
          <div className="overflow-x-auto">
            <table className="table text-md">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {accessFasyankes && accessFasyankes.length > 0 ? (
                  accessFasyankes.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.role}</td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>{item.created_by}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Tidak ada data untuk ditampilkan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={() => modalRef.current?.close()}>
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
