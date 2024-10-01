/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";

export const ToastAlert = (icon: any, message: any) => {
  return Swal.fire({
    icon: icon,
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export const CenterAlert = (icon: any, onConfirm: () => void) => {
  Swal.fire({
    title: "Apakah kamu yakin?",
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Iya",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      // Jika user menekan "Iya"
      Swal.fire({
        title: "Berhasil!",
        text: "Sudah terkonfirmasi",
        icon: "success",
      }).then(() => {
        // Setelah alert sukses, panggil callback
        onConfirm();
      });
    }
  });
};
