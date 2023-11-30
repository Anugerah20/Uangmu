import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const DataNoteTable = ({ savedData, handleDelete, handleEdit }) => {
     if (!savedData) {
          return null;
     }

     // Format Amount
     const formatAmountID = new Intl.NumberFormat("id-ID").format(savedData.nominal);

     // Format Date
     const formattedDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(savedData.tanggal));

     const splitDate = formattedDate.split(' ');
     const dateSlash = `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`;

     return (
          <>
               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.deskripsi}</td>
                    <td className="px-6 py-3">{dateSlash}</td>
                    <td className="px-6 py-3">{formatAmountID}</td>
                    <td className="px-6 py-3">{savedData.jenis === "pemasukan" ? "pemasukan" : "pengeluaran"}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" className="text-red-500" onClick={() => handleDelete(savedData.id)}><FaTrashAlt /></Link>
                         <Link to="#" title="Edit" className="text-green-500" onClick={() => handleEdit(savedData.id)}><FaEdit /></Link>
                    </td>
               </tr>
          </>
     );
};

export default DataNoteTable;
