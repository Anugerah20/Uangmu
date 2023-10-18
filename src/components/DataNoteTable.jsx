import { FaTrashAlt, FaEdit } from "react-icons/fa";

const DataNoteTable = ({ savedData }) => {
     if (!savedData) {
          return null;
     }

     const formatAmountID = new Intl.NumberFormat("id-ID").format(savedData.nominal);
     const partDate = savedData.tanggal.split("-");
     const formattedDate = `${partDate[2]}/${partDate[1]}/${partDate[0]}`;

     return (
          <tr className="bg-primary border-gray-300">
               <td className="whitespace-nowrap">{savedData.deskripsi}</td>
               <td>{formattedDate}</td>
               <td>{formatAmountID}</td>
               <td>{savedData.jenis === "pemasukan" ? "pemasukan" : "pengeluaran"}</td>
               <td className="flex justify-center gap-2 mt-1">
                    <a href="#" title="Hapus"><FaTrashAlt /></a>
                    <a href="#" title="Ubah"><FaEdit /></a>
               </td>
          </tr>
     );
};

export default DataNoteTable
