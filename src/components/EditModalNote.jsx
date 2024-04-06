import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { userApiEditData, useApiGet } from "../services/apiService";
import { toast } from "sonner";
import { formatDate } from "../services/formatDate";

const EditModalNote = ({ isOpen, data, onSubmitSuccess }) => {
     document.title = "Uangmu | Edit Catatan";

     // console.log(data)

     const [loading, setLoading] = useState(false);
     const [editData, setEditData] = useState(null);

     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
          reset
     } = useForm();

     // Fungsi untuk mengambil data yang akan di edit bedasarkan id
     const userId = localStorage.getItem("userId");

     const getEditNote = async () => {
          try {
               const response = await useApiGet(`/get-note/${userId}`);
               setEditData(response.data);
               setValue("description", response.data.description)
               setValue("date", formatDate(data.date))
               setValue("price", response.data.price)
               setValue("noteType", response.data.noteType)

          } catch (error) {
               console.error("Error edit data: ", error);
          }
     }

     useEffect(() => {
          if (isOpen) {
               getEditNote();
          }
     }, [isOpen]);

     // Fungsi untuk edit catatan
     const editNote = async (data) => {
          data.date = new Date(data.date).toISOString();
          try {
               const response = await userApiEditData(`/edit-note/${userId}`, data);
               // console.log(response);
               if (response.status === 200) {
                    toast.success("Catatan berhasil diubah");
                    setLoading(false);
                    onSubmitSuccess();
               }
          } catch (error) {
               console.error("Error edit note: ", error);
          }
     }

     // Menampilkan data yang akan di edit
     useEffect(() => {
          if (editData) {
               setValue("description", data.description)
               setValue("date", formatDate(data.date))
               setValue("price", data.price)
               setValue("noteType", data.noteType)
          }
     }, [editData]);

     return (
          <Modal
               show={isOpen}
               size="md"
               popup
               onClose={() => onSubmitSuccess()}
          >
               <Modal.Header />
               <Modal.Body>
                    <div className="space-y-6">
                         <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                              Edit Catatan Keuangan
                         </h3>
                         <form onSubmit={handleSubmit(editNote)}>
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

                              <button className="btn-modal mt-4" type="submit">{loading ? "Proses..." : "Edit Catatan"}</button>
                         </form>
                    </div>
               </Modal.Body>
          </Modal>
     );
};

export default EditModalNote;

