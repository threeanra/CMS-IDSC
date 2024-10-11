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

  return `${day} ${monthNames[month]} ${year}`;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  // Array of months in Indonesian
  const months = [
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

  const day = date.getUTCDate(); // Get the day
  const month = months[date.getUTCMonth()]; // Get the month (in Indonesian)
  const year = date.getUTCFullYear(); // Get the year
  const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours in 24-hour format
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
