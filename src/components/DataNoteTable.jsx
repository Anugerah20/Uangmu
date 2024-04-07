import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EditModalNote from "./EditModalNote";
import { useEffect, useState } from "react";

const DataNoteTable = ({ savedData, onSubmitSuccess, onDelete }) => {
     const [isOpenEdit, setIsOpenEdit] = useState(false);
     const [triggerEffect, setTriggerEffect] = useState(false);

     // Fungsi konfrimasi hapus data
     const handleDelete = (id) => {
          const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus catatan ini?");
          if (confirmDelete) {
               onDelete(id);
               savedData(savedData.filter((data) => data.id !== id));
               toast.success("Catatan berhasil dihapus");
               onSubmitSuccess();
          }
     }

     // Format Amount
     const formatAmountID = new Intl.NumberFormat("id-ID").format(savedData.price);

     // Format Date
     const formattedDate = savedData.date ? new Intl.DateTimeFormat("id-ID",
          {
               day: "2-digit",
               month: "2-digit",
               year: "numeric",
          }).format(new Date(savedData.date))
          : "";

     // const splitDate = formattedDate.split(" ");
     // const dateSlash = `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`;
     const dateSlash = formattedDate.split(" ");

     useEffect(() => {
          onSubmitSuccess();
     }, [triggerEffect])

     return (
          <>
               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.description}</td>
                    <td className="px-6 py-3">{dateSlash}</td>
                    <td className="px-6 py-3">{formatAmountID}</td>
                    <td className="px-6 py-3">{savedData.noteType}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" className="text-red-500" onClick={() => handleDelete(savedData.id)}><FaTrashAlt /></Link>

                         <EditModalNote date={formattedDate} isOpen={isOpenEdit} data={savedData} onSubmitSuccess={() => setTriggerEffect(!triggerEffect)} />
                    </td>
               </tr >
          </>
     );
};

export default DataNoteTable;