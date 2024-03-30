import { jsPDF } from "jspdf";

const DownloadPdf = ({ financialData, selectMonth }) => {
     const downloadFile = () => {
          const pdf = new jsPDF();
          pdf.text("Laporan Keuangan", 20, 10);

          const filteredData = selectMonth === "Semua Bulan" ? financialData : financialData.filter((data) => new Date(data.tanggal).toLocaleString("id-ID", { month: "long" }) === selectMonth);

          // Setting row and column table
          const headerYPos = 40;
          const rowHeight = 10;
          const col1XPos = 10;
          const col2XPos = 50;
          const col3XPos = 100;
          const col4XPos = 150;

          // Header Table
          pdf.setFont("helvetica", "bold");
          pdf.text("Deskripsi", col1XPos, headerYPos);
          pdf.text("Tanggal", col2XPos, headerYPos);
          pdf.text("Nominal", col3XPos, headerYPos);
          pdf.text("Jenis", col4XPos, headerYPos);
          pdf.line(col1XPos, headerYPos + 5, col4XPos + 30, headerYPos + 5);

          pdf.setFont("helvetica", "normal");

          filteredData.forEach((data, index) => {
               const yPos = headerYPos + (index + 1) * rowHeight;
               const formattedNominal = new Intl.NumberFormat("id-ID").format(data.nominal);

               pdf.text(data.deskripsi, col1XPos, yPos);
               pdf.text(new Date(data.tanggal).toLocaleDateString("id-ID"), col2XPos, yPos);
               pdf.text("Rp " + formattedNominal, col3XPos, yPos);
               pdf.text(data.jenis === "pemasukan" ? "Pemasukan" : "Pengeluaran", col4XPos, yPos);
          });

          pdf.save("laporan_keuangan.pdf");
     }

     const checkButtonVisible = financialData.length > 0 && (selectMonth === "Semua Bulan" || financialData.some(data => new Date(data.tanggal).toLocaleString("id-ID", { month: "long" }) === selectMonth));

     return (
          <>   {checkButtonVisible && (
               // <button className="btn-note lg:my-4 md:my-5 my-5" onClick={downloadFile}>Download PDF</button>
               <button className="btn-note mb-10" onClick={downloadFile}>Download PDF</button>
          )}
          </>
     )
}

export default DownloadPdf