import React, { useState, useRef } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { Modal, Table } from 'flowbite-react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const TakeNotes = () => {
     const [deskripsi, setDeskripsi] = useState("");
     const [tanggal, setTanggal] = useState("");
     const [nominal, setNominal] = useState("");
     const [savedData, setSavedData] = useState([]);
     const [openModal, setOpenModal] = useState(false);
     const [jenisCatatan, setJenisCatatan] = useState("pemasukan");
     const [totalPemasukan, setTotalPemasukan] = useState(0);
     const [totalPengeluaran, setTotalPengeluaran] = useState(0);
     const setModal = useRef(null);

     // State Input
     const handlerInputChange = (e, inputName) => {
          const newValue = e.target.value;
          switch (inputName) {
               case "deskripsi":
                    setDeskripsi(newValue);
                    break;
               case "tanggal":
                    setTanggal(newValue);
                    break;
               case "nominal":
                    setNominal(newValue);
                    break;
               default:
                    break;
          }
     };

     // Validation input
     const handleSubmit = (e) => {
          e.preventDefault();

          if (deskripsi === "" || tanggal === "" || nominal === "") {
               alert("Harus diisi semua");
               return;
          } else if (isNaN(nominal)) {
               return alert("Nominal hanya menerima angka");
          }

          // Storage
          const newDataNote = {
               deskripsi,
               tanggal,
               nominal: parseFloat(nominal),
               jenis: jenisCatatan,
          };

          // Calculate money
          if (nominal > 0) {
               setTotalPemasukan(totalPemasukan + newDataNote.nominal);
          } else {
               setTotalPengeluaran(totalPengeluaran + newDataNote.nominal);
          }

          const updatedData = [...savedData, newDataNote];
          setSavedData(updatedData);

          // Clear input
          setDeskripsi("");
          setTanggal("");
          setNominal("");
          setOpenModal(false);
     };

     // Function table
     const DataNoteTable = ({ deskripsi, tanggal, nominal, jenis }) => {
          const formatAmountID = new Intl.NumberFormat("id-ID").format(nominal);

          const partDate = tanggal.split("-");
          const formattedDate = `${partDate[2]}/${partDate[1]}/${partDate[0]}`;
          return (
               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap">{deskripsi}</Table.Cell>
                    <Table.Cell>{formattedDate}</Table.Cell>
                    <Table.Cell>Rp {formatAmountID}</Table.Cell>
                    <Table.Cell>{jenis === "pemasukan" ? "pemasukan" : "pengeluaran"}</Table.Cell>
               </Table.Row>
          );
     };

     return (
          <>
               <Navigation />

               <div className="flex flex-wrap">

                    {/* START: MODAL KEUANGAN */}
                    <div className="flex flex-col gap-4 mx-auto w-4/5 sm:w-2/4 md:w-2/5">
                         <Button onClick={() => setOpenModal(true)}>Buat Catatan Sekarang</Button>
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
                                                  type="text"
                                                  autoComplete="off"
                                                  value={nominal}
                                                  onChange={(e) => handlerInputChange(e, "nominal")}
                                             />
                                        </div>

                                        <div className="mb-2 block">
                                             <Label htmlFor="jenisCatatan" value="Jenis Catatan" />
                                        </div>
                                        <div className="block mt-2">
                                             <input
                                                  type="radio"
                                                  id="pemasukan"
                                                  name="jenisCatatan"
                                                  value="pemasukan"
                                                  checked={jenisCatatan === "pemasukan"}
                                                  onChange={(e) => setJenisCatatan(e, "jenisCatatan")}
                                             />
                                             <label htmlFor="pemasukan" className="mr-2">Pemasukan</label>
                                             <input
                                                  type="radio"
                                                  id="pengeluaran"
                                                  name="jenisCatatan"
                                                  value="pengeluaran"
                                                  checked={jenisCatatan === "pengeluaran"}
                                                  onChange={(e) => setJenisCatatan(e, "jenisCatatan")}
                                             />
                                             <label htmlFor="pengeluaran">Pengeluaran</label>
                                        </div>

                                        <Button type="submit" onClick={handleSubmit}>Kirim Sekarang</Button>
                                   </div>
                              </Modal.Body>
                         </Modal>
                    </div>
                    {/* END: MODAL KEUANGAN */}

                    {/* START: MEMASUKKAN DATA */}
                    <div className="flex flex-col mx-auto mt-10 mb-5 w-4/5 sm:w-2/4 md:w-2/5">

                         <Table className="text-center">
                              <Table.Head>
                                   <Table.HeadCell>
                                        Deskripsi
                                   </Table.HeadCell>
                                   <Table.HeadCell>
                                        Tanggal
                                   </Table.HeadCell>
                                   <Table.HeadCell>
                                        Nominal
                                   </Table.HeadCell>
                                   <Table.HeadCell>
                                        Jenis
                                   </Table.HeadCell>
                              </Table.Head>
                              <Table.Body className="divide-y">
                                   {savedData.length === 0 ? (
                                        <tr>
                                             <td colSpan="4" className="text-center font-bold py-2">
                                                  Catatan uangmu tidak tersedia
                                             </td>
                                        </tr>
                                   ) : (
                                        savedData.map((data, index) => (
                                             <DataNoteTable
                                                  key={index}
                                                  deskripsi={data.deskripsi}
                                                  tanggal={data.tanggal}
                                                  nominal={data.nominal}
                                                  jenis={data.jenis}
                                             />
                                        ))
                                   )}
                              </Table.Body>
                         </Table>
                    </div>
                    {/* END: MEMASUKKAN DATA */}

               </div >
               <Footer />
          </>
     );
};

export default TakeNotes;
