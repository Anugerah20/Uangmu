import { Fragment, useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { userApiEditData } from "../services/apiService";
import { toast } from "sonner";
import formatDate from "../services/formatDate";
import { formatToIDR } from "../utils/currencyMoney";

const EditModalNote = ({ isOpen, data, onSubmitSuccess }) => {
     document.title = "Uangmu | Edit Catatan";

     const [loading, setLoading] = useState(false);

     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();

     const userId = localStorage.getItem("userId");

     useEffect(() => {
          setValue("description", data.description);
          setValue("date", formatDate(data.date, 'YYYY-MM-DD'));
          setValue("price", data.price);
          setValue("noteType", data.noteType);
     }, [isOpen, setValue, data]);

     const editNote = async (formData) => {
          formData.date = new Date(formData.date).toISOString();
          formData.price = parseInt(formData.price);
          try {
               const response = await userApiEditData(`/edit-note/${userId}`, formData);
               if (response.status === 201) {
                    toast.success("Catatan berhasil diubah");
                    setLoading(false);
                    onSubmitSuccess();
               }
          } catch (error) {
               console.log("Error edit note: ", error);
          }
     }

     return (
          <Fragment>
               <Modal
                    show={isOpen}
                    size="md"
                    popup
                    onClose={onSubmitSuccess}
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                   Edit Catatan Keuangan
                              </h3>
                              <form onSubmit={handleSubmit(editNote)}>
                                   <div>
                                        <label htmlFor="description">Deskripsi</label>
                                        <input type="text" id="description" {...register("description", { required: true })} />
                                        {errors.description && <span className="text-danger">Deskripsi harus diisi</span>}
                                   </div>
                                   <div>
                                        <label htmlFor="date">Tanggal</label>
                                        <input type="date" id="date" {...register("date", { required: true })} />
                                        {errors.date && <span className="text-danger">Tanggal harus diisi</span>}
                                   </div>
                                   <div>
                                        <label htmlFor="price">Nominal</label>
                                        <input type="number" id="price" {...register("price", { required: true, min: 0 })} />
                                        {errors.price && <span className="text-danger">Nominal harus diisi dan tidak boleh negatif</span>}
                                   </div>
                                   <div>
                                        <label htmlFor="noteType">Jenis Catatan</label>
                                        <select id="noteType" {...register("noteType", { required: true })}>
                                             <option value="" disabled>Pilih jenis catatan</option>
                                             <option value="Pemasukan">Pemasukan</option>
                                             <option value="Pengeluaran">Pengeluaran</option>
                                        </select>
                                        {errors.noteType && <span className="text-danger">Jenis catatan harus dipilih</span>}
                                   </div>

                                   <button className="btn-modal mt-4" type="submit">{loading ? "Tunggu..." : "Edit Catatan"}</button>
                              </form>
                         </div>
                    </Modal.Body>
               </Modal>
          </Fragment>
     );
};

export default EditModalNote;
