import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';

const ModalNote = ({ openModal, setOpenModal, deskripsi, tanggal, nominal, jenisCatatan, setJenisCatatan, handlerInputChange, handleSubmit, setModal, editNote, handleEdit }) => {

     const [statusModalNote, setStatusModalNote] = useState('tambah');

     useEffect(() => {
          setStatusModalNote(editNote ? 'edit' : 'tambah');
     }, [editNote]);

     // Reset close modal
     const resetModalNote = () => {
          handlerInputChange({ target: { value: '' } }, 'deskripsi');
          handlerInputChange({ target: { value: '' } }, 'tanggal');
          handlerInputChange({ target: { value: '' } }, 'nominal');
          setJenisCatatan('');
     }

     // Reset status modal when closing the modal
     const resetModalStatus = () => {
          setStatusModalNote('');
     };

     return (
          <div className="container-note w-4/5 lg:w-1/4 sm:w-1/2 md:w-2/5 flex justify-end self-end  ml-[3.3rem] md:ml-10 lg:ml-[4.5rem]">
               <button onClick={() => { setOpenModal(true); resetModalNote(); }} className="btn-note -mt-5 md:-mt-10 lg:-mt-10">Buat Catatan</button>
               <Modal
                    show={openModal}
                    size="md"
                    popup
                    onClose={() => { setOpenModal(false); resetModalStatus(); }}
                    initialFocus={setModal}
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                   {statusModalNote === 'edit' ? 'Edit Catatan Keuangan' : 'Tambah Catatan Keuangan'}
                              </h3>
                              <div>
                                   <div className="mb-2 block">
                                        <label htmlFor="deskripsi">Deskripsi</label>
                                   </div>
                                   <input
                                        id="deskripsi"
                                        name="deskripsi"
                                        placeholder="contoh: beli kopi"
                                        type="text"
                                        autoComplete="off"
                                        value={deskripsi}
                                        onChange={(e) => handlerInputChange(e, "deskripsi")}
                                        autoFocus
                                   />
                              </div>
                              <div>
                                   <div className="mb-2 block">
                                        <label htmlFor="tanggal">Tanggal</label>
                                   </div>
                                   <input
                                        id="tanggal"
                                        name="tanggal"
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) => handlerInputChange(e, "tanggal")}
                                   />
                              </div>
                              <div>
                                   <div className="mb-2 block">
                                        <label htmlFor="nominal">Nominal</label>
                                   </div>
                                   <input
                                        id="nominal"
                                        name="nominal"
                                        placeholder="contoh: 10000"
                                        type="text"
                                        autoComplete="off"
                                        value={nominal}
                                        onChange={(e) => handlerInputChange(e, "nominal")}
                                   />
                              </div>

                              <div className="block">
                                   <label htmlFor="pemasukan">Jenis Catatan</label>
                              </div>
                              <div className="block">
                                   <input
                                        type="radio"
                                        id="pemasukan"
                                        name="pemasuka"
                                        value="pemasukan"
                                        checked={jenisCatatan === "pemasukan"}
                                        onChange={() => setJenisCatatan("pemasukan")}
                                   />
                                   <label htmlFor="pemasukan" className="mr-2">Pemasukan</label>
                                   <input
                                        type="radio"
                                        id="pengeluaran"
                                        name="pengeluaran"
                                        value="pengeluaran"
                                        checked={jenisCatatan === "pengeluaran"}
                                        onChange={() => setJenisCatatan("pengeluaran")}
                                   />
                                   <label htmlFor="pemasukan">Pengeluaran</label>
                              </div>

                              <button className="btn-modal" type="submit" onClick={editNote ? handleEdit : handleSubmit}>
                                   {editNote ? 'Simpan data' : 'Kirim sekarang'}
                              </button>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     )
}

export default ModalNote