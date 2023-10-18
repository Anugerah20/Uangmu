import { Modal, Button, Label, TextInput } from 'flowbite-react';

const ModalNote = ({ openModal, setOpenModal, deskripsi, tanggal, nominal, jenisCatatan, setJenisCatatan, handlerInputChange, handleSubmit, setModal }) => {
     return (
          <div className="container-note w-4/5 lg:w-1/4 sm:w-1/2 md:w-2/5 flex justify-end self-end  ml-10 md:ml-10 lg:ml-[4.5rem]">
               <button onClick={() => setOpenModal(true)} className="btn-note -mt-5 md:-mt-10 lg:-mt-10">Buat Catatan</button>
               <Modal
                    show={openModal}
                    size="md"
                    popup
                    onClose={() => setOpenModal(false)}
                    initialFocus={setModal}
               >
                    <Modal.Header />
                    <Modal.Body>
                         <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Tambah Catatan Keuangan</h3>
                              <div>
                                   <div className="mb-2 block">
                                        <Label htmlFor="deskripsi" value="Deskripsi" />
                                   </div>
                                   <TextInput
                                        id="deskripsi"
                                        name="deskripsi"
                                        placeholder="contoh: beli kopi"
                                        type="text"
                                        autoComplete="off"
                                        value={deskripsi}
                                        onChange={(e) => handlerInputChange(e, "deskripsi")}
                                   />
                              </div>
                              <div>
                                   <div className="mb-2 block">
                                        <Label htmlFor="tanggal" value="Tanggal" />
                                   </div>
                                   <TextInput
                                        id="tanggal"
                                        name="tanggal"
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) => handlerInputChange(e, "tanggal")}
                                   />
                              </div>
                              <div>
                                   <div className="mb-2 block">
                                        <Label htmlFor="nominal" value="Nominal" />
                                   </div>
                                   <TextInput
                                        id="nominal"
                                        name="nominal"
                                        placeholder="contoh: 10000"
                                        type="number"
                                        autoComplete="off"
                                        value={nominal}
                                        onChange={(e) => handlerInputChange(e, "nominal")}
                                   />
                              </div>

                              <div className="block">
                                   <Label htmlFor="pemasukan" value="Jenis Catatan" />
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
                                   <Label htmlFor="pemasukan" className="mr-2" value="Pemasukan" />
                                   <input
                                        type="radio"
                                        id="pengeluaran"
                                        name="pengeluaran"
                                        value="pengeluaran"
                                        checked={jenisCatatan === "pengeluaran"}
                                        onChange={() => setJenisCatatan("pengeluaran")}
                                   />
                                   <Label htmlFor="pengeluaran" value="Pengeluaran" />
                              </div>

                              <Button color="success" type="submit" onClick={handleSubmit}>Kirim Sekarang</Button>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     )
}

export default ModalNote