import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EditModalNote from "./EditModalNote";
import { useEffect, useState } from "react";
import formatDate from "../services/formatDate";
import ConfirmDeleteNote from "./ConfirmDeleteNote";

const DataNoteTable = ({ savedData, onSubmitSuccess, onDelete }) => {
     const [isOpenEdit] = useState(false);
     const [triggerEffect, setTriggerEffect] = useState(false);
     const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
     const [deleteId, setDeleteId] = useState(null);

     // Fungsi konfrimasi hapus data
     const handleDelete = (id) => {
          setDeleteId(id);
          setIsConfirmDeleteOpen(true);
     }

     const confirmDelete = () => {
          if (deleteId !== null) {
               onDelete(deleteId);
               toast.success("Catatan berhasil dihapus");
               onSubmitSuccess();
               setIsConfirmDeleteOpen(false);
               setTriggerEffect(!triggerEffect);
          }
     };

     // Fungsi konfrimasi hapus data
     // const handleDelete = (id) => {
     //      const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus catatan ini?");
     //      if (confirmDelete) {
     //           onDelete(id);
     //           toast.success("Catatan berhasil dihapus");
     //           savedData(savedData.filter((data) => data.id !== id));
     //           onSubmitSuccess();
     //      }
     // }

     // Format Amount
     const formatAmountID = new Intl.NumberFormat("id-ID").format(savedData.price);

     const formattedDate = formatDate(savedData.date, 'DD-MM-YYYY');

     useEffect(() => {
          onSubmitSuccess();
     }, [triggerEffect])

     return (
          <>
               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.description}</td>
                    <td className="px-6 py-3">{formattedDate}</td>
                    <td className="px-6 py-3">{formatAmountID}</td>
                    <td className="px-6 py-3">{savedData.noteType}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" onClick={() => handleDelete(savedData.id)}><FaTrashAlt /></Link>

                         <EditModalNote date={savedData.date} isOpen={isOpenEdit} data={savedData} onSubmitSuccess={() => setTriggerEffect(!triggerEffect)} />
                    </td>
               </tr >

               <ConfirmDeleteNote isOpen={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)} onConfirm={confirmDelete} />
          </>
     );
};

export default DataNoteTable;