/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EditModalNote from "./EditModalNote";
import { useEffect, useState } from "react";
// import formatDate from "../services/formatDate";
import ConfirmDeleteNote from "./ConfirmDeleteNote";
import { formatToIDR } from "../utils/currencyMoney";
import { FaEdit } from "react-icons/fa";

import { joinedAtDate } from "../services/apiDate"

const DataNoteTable = ({ savedData, onSubmitSuccess, onDelete, setUpdateChart }) => {
     const [openEditId, setOpenEditId] = useState(null);
     const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
     const [deleteId, setDeleteId] = useState(null);
     const [isDeleted, setIsDeleted] = useState(false);
     const [currentData, setCurrentData] = useState(savedData);

     // Fungsi konfrimasi hapus data
     const handleDelete = (id) => {
          setDeleteId(id);
          setIsConfirmDeleteOpen(true);
          setUpdateChart(prev => !prev);
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

     // Memperbarui catatan setelah diedit
     const handleUpdateNote = (updatedNote) => {
          setCurrentData(updatedNote);
          setOpenEditId(null);
          setUpdateChart(prev => !prev);
     };

     return (
          <>
               <tr className="bg-primary border-gray-300">
                    <td className="whitespace-nowrap px-6 py-3">{savedData.description}</td>
                    {/* <td className="px-6 py-3">{formatDate(savedData.date)}</td> */}
                    <td className="px-6 py-3">{joinedAtDate(savedData.date)}</td>
                    <td className="px-6 py-3">{formatToIDR(savedData.price)}</td>
                    <td className="px-6 py-3">{savedData.noteType}</td>
                    <td className="flex justify-center gap-4 mt-1 px-6 py-3">
                         <Link to="#" title="Hapus" onClick={() => handleDelete(savedData.id)}><FaTrashAlt /></Link>

                         <button onClick={() => setOpenEditId(savedData.id)}>
                              <FaEdit />
                         </button>

                         <EditModalNote
                              isOpen={openEditId === savedData.id}
                              data={currentData}
                              onSubmitSuccess={(updatedNote) => {
                                   handleUpdateNote(updatedNote);
                                   onSubmitSuccess();
                              }}
                         />
                    </td>
               </tr >

               <ConfirmDeleteNote isOpen={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)} onConfirm={confirmDelete} />
          </>
     );
};

export default DataNoteTable;
