import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EditModalNote from "./EditModalNote";
import { useEffect, useState } from "react";
import formatDate from "../services/formatDate";
import ConfirmDeleteNote from "./ConfirmDeleteNote";
import { formatToIDR } from "../utils/currencyMoney";
import { FaEdit } from "react-icons/fa";

const DataNoteTable = ({ savedData, onSubmitSuccess, onDelete }) => {
     // const [isOpenEdit, setIsOpenEdit] = useState(false);
     // const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
     // const [deleteId, setDeleteId] = useState(null);
     // const [isDeleted, setIsDeleted] = useState(false);

     // const [triggerEffect, setTriggerEffect] = useState(false);
     const [openEditId, setOpenEditId] = useState(null);
     const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
     const [deleteId, setDeleteId] = useState(null);
     const [isDeleted, setIsDeleted] = useState(false);

     // Fungsi konfrimasi hapus data
     const handleDelete = (id) => {
          setDeleteId(id);
          setIsConfirmDeleteOpen(true);
     }

     // Fungsi konfirmasi hapus data berdasarkan id catatan
     const confirmDelete = () => {
          if (deleteId !== null) {
               onDelete(deleteId);
               setIsDeleted(true);
               setIsConfirmDeleteOpen(false);
          }
     };

     useEffect(() => {
          if (isDeleted) {
               toast.success("Catatan berhasil dihapus");
               onSubmitSuccess();
               setIsDeleted(false);
          }
     }, [isDeleted, onSubmitSuccess]);

     // Jangan render apapun jika catatan telah dihapus
     if (isDeleted) {
          return null;
     }

     const handleUpdateNote = (updatedNote) => {
          // Cari catatan yang sesuai dan perbarui
          setNotes(prevNotes => prevNotes.map(note =>
               note.id === updatedNote.id ? updatedNote : note
          ));
          setOpenEditId(null);
     };

     return (
          <>
               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.description}</td>
                    <td className="px-6 py-3">{formatDate(savedData.date)}</td>
                    <td className="px-6 py-3">{formatToIDR(savedData.price)}</td>
                    <td className="px-6 py-3">{savedData.noteType}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" onClick={() => handleDelete(savedData.id)}><FaTrashAlt /></Link>

                         {/* <button onClick={() => setIsOpenEdit(true)}><FaEdit /></button> */}

                         <button onClick={() => setOpenEditId(savedData.id)}>
                              <FaEdit />
                         </button>

                         {/* <EditModalNote isOpen={isOpenEdit} date={savedData.date} data={savedData} onSubmitSuccess={() => { setTriggerEffect(!triggerEffect); setIsOpenEdit(false); onSubmitSuccess(); }} /> */}

                         <EditModalNote
                              isOpen={openEditId === savedData.id}
                              data={savedData}
                              onSubmitSuccess={() => {
                                   setOpenEditId(null); // Close modal after success
                                   handleUpdateNote(updatedNote);
                                   // setTriggerEffect(!triggerEffect);
                              }}
                         />
                    </td>
               </tr >

               <ConfirmDeleteNote isOpen={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)} onConfirm={confirmDelete} />
          </>
     );
};

export default DataNoteTable;
