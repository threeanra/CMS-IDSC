export function formatDate(isoDate: string): string {
  const dateObj = new Date(isoDate);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth(); // Start index from 0
  const year = dateObj.getUTCFullYear();

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Format: "tanggal nama bulan tahun"
  return `${day} ${monthNames[month]} ${year}`;
}
