import { data } from "autoprefixer";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const DataNoteTable = ({ savedData, onSubmitSuccess, onDelete, handleEdit }) => {
     const handleDelete = (id) => {
          const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus catatan ini?");
          if (confirmDelete) {
               onDelete(id);
               toast.success("Catatan berhasil dihapus");
               onSubmitSuccess();
          }
     }

     // Format Amount
     const formatAmountID = new Intl.NumberFormat("id-ID").format(savedData.price);

     // Format Date
     const formattedDate = savedData.date ? new Intl.DateTimeFormat("id-ID",
          {
               day: "numeric",
               month: "short",
               year: "numeric"
          }).format(new Date(savedData.date))
          : null;

     const splitDate = formattedDate.split(" ");
     const dateSlash = `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`;

     return (
          <>

               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.description}</td>
                    <td className="px-6 py-3">{dateSlash}</td>
                    <td className="px-6 py-3">{formatAmountID}</td>
                    <td className="px-6 py-3">{savedData.noteType}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" className="text-red-500" onClick={() => handleDelete(data.id)}><FaTrashAlt /></Link>

                         {/* <Link to="#" title="Edit" className="text-green-500" onClick={() => handleEdit(savedData.id)}><FaEdit /></Link> */}
                    </td>
               </tr>
          </>
     );
};

export default DataNoteTable;