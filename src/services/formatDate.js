// Fungsi untuk mengubah format tanggal
const formatDate = (dateString, format = "DD/MM/YYYY") => {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = (date.getMonth() + 1).toString().padStart(2, "0");
     const day = date.getDate().toString().padStart(2, "0");

     // Cek format tanggal apakah "DD/MM/YYYY" atau "YYYY/MM/DD"
     // Jika "DD/MM/YYYY" maka tampilkan "day/month/year"
     // Jika "YYYY/MM/DD" maka tampilkan "year/month/day"

     if (format === "DD/MM/YYYY") {
          return `${day}/${month}/${year}`;
     } else if (format === "YYYY-MM-DD") {
          return `${year}-${month}-${day}`;
     }
     return dateString;
}

export default formatDate;
