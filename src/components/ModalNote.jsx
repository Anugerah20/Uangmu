import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { userApiPost } from "../services/apiService";
// import { useNavigate } from "react-router-dom";

const ModalNote = ({ handleAddNote }) => {
     document.title = "Uangmu | Catatan";

     const [openModal, setOpenModal] = useState(false);
     const [loading, setLoading] = useState(false);

     // const [description, setDescription] = useState("");
     // const [date, setDate] = useState("");
     // const [price, setPrice] = useState("");
     // const [noteType, setNoteType] = useState("");

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset
     } = useForm();

     // const navigate = useNavigate();

     const onSubmit = async (data) => {
          try {
               setLoading(true);

               const noteData = {
                    description: data.description,
                    date: new Date(data.date).toISOString(),
                    price: data.price,
                    noteType: data.noteType,
               };

               // Kirim data catatan ke API untuk ditambahkan
               const response = await userApiPost("/note", noteData);
               // console.log("Data catatan ditambahkan: ", response);

               // Notifikasi sukses
               if (response.status === 200) {
                    setLoading(false);
                    // Notifikasi catatan berhasil ditambahkan
                    toast.success("Catatan berhasil ditambahkan");
                    setTimeout(() => {
                         window.location.href = "/takenotes";
                    }, 500);
                    reset();
               }
          } catch (error) {
               // Tangani error jika ada
               console.error("Error adding note: ", error);

               // Notifikasi error
               toast.error("Gagal menambahkan catatan", {
                    duration: 2000,
               });
          } finally {
               // Reset loading jika proses selesai atau gagal
               setLoading(false);
          }
     };

     // Mengatur modal setelah ditutup
     useEffect(() => {
          if (!openModal) {
               reset();
          }
     }, [openModal]);

     return (
          <div className="container-note w-4/5 lg:w-1/4 sm:w-1/2 md:w-2/5 flex justify-end self-end  ml-[3.3rem] md:ml-10 lg:ml-[4.5rem]">
               <button onClick={() => setOpenModal(true)} className="btn-note -mt-5 md:-mt-10 lg:-mt-10">Buat Catatan</button>
               <Modal
                    show={openModal}
                    size="md"
                    popup
                    onClose={() => setOpenModal(false)}
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                   Tambah Catatan Keuangan
                              </h3>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div>
                                        <div className="mb-2 block">
                                             <label htmlFor="description">Deskripsi</label>
                                        </div>
                                        <input type="text" id="description" {...register("description", { required: true })} />
                                        {errors.description && <span className="text-danger">Deskripsi harus diisi</span>}
                                   </div>
                                   <div>
                                        <div className="mb-2 block">
                                             <label htmlFor="date">Tanggal</label>
                                        </div>
                                        <input type="date" id="date" {...register("date", { required: true })} />
                                        {errors.date && <span className="text-danger">Tanggal harus diisi</span>}
                                   </div>
                                   <div>
                                        <div className="mb-2 block">
                                             <label htmlFor="price">Nominal</label>
                                        </div>
                                        <input type="number" id="price" {...register("price", { required: true, min: 0 })} />
                                        {errors.price && errors.price.type === "required" && <span className="text-danger">Nominal harus diisi</span>}
                                        {errors.price && errors.price.type === "min" && <span className="text-danger">Nominal tidak boleh negatif</span>}
                                   </div>

                                   <div className="block">
                                        <label htmlFor="noteType">Jenis Catatan</label>
                                        <select id="noteType" {...register("noteType", { required: true })}>
                                             <option value="" disabled>Pilih jenis catatan</option>
                                             <option value="Pemasukan">Pemasukan</option>
                                             <option value="Pengeluaran">Pengeluaran</option>
                                        </select>
                                        {errors.noteType && <span className="text-danger">Jenis catatan harus dipilih</span>}
                                   </div>

                                   <button className="btn-modal mt-4" type="submit">{loading ? "Menambahkan..." : "Tambah Catatan"}</button>
                              </form>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     );
};

export default ModalNote;
