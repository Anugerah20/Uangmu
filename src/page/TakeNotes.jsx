import { Button, Label, TextInput } from 'flowbite-react';
import { Table } from 'flowbite-react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState } from 'react';

const TakeNotes = () => {
     document.title = "Uangmu | Buat Catatan";

     // Inisialisasi data yg mau disimpan
     const [deskripsi, setDeskripsi] = useState("");
     const [tanggal, setTanggal] = useState("");
     const [nominal, setNominal] = useState("");
     const [savedData, setSavedData] = useState([])

     function dataNote(e) {
          e.preventDefault();

          // Validasi inputan
          if (deskripsi === "") {
               return alert("Deskripsi wajib diisi!");
          } else if (tanggal === "") {
               return alert("Tanggal wajib diisi!");
          } else if (nominal === "") {
               return alert("Nominal wajib di isi");
          } else if (isNaN(nominal) === true) {
               return alert("Nominal harus angka");
          }

          // Wadah untuk menyimpan data sementara
          const newDataNote = {
               deskripsi,
               tanggal,
               nominal
          };
          console.log(newDataNote);

          const updatedData = [...savedData, newDataNote];
          setSavedData(updatedData);

          // clear input
          setDeskripsi("");
          setTanggal("");
          setNominal("");
     }

     // function untuk tabel
     function DataNoteTable({ deskripsi, tanggal, nominal }) {
          return (
               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap">
                         {deskripsi}
                    </Table.Cell>
                    <Table.Cell>
                         {tanggal}
                    </Table.Cell>
                    <Table.Cell>
                         Rp {nominal}
                    </Table.Cell>
               </Table.Row>
          )
     }

     return (
          <>
               <Navigation />

               <h1 className="text-2xl font-bold text-center">Buat Catatan</h1>

               {/* START: FORMULIR KEUANGAN */}
               <form onSubmit={dataNote} className="flex max-w-md flex-col gap-4 mx-auto">
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="deskripsi"
                                   value="Deskripsi"
                              />
                         </div>
                         <TextInput
                              id="deskripsi"
                              name="deskripsi"
                              placeholder="contoh: beli kopi"
                              type="text"
                              value={deskripsi}
                              onChange={(e) => setDeskripsi(e.target.value)}
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="tanggal"
                                   value="Tanggal"
                              />
                         </div>
                         <TextInput
                              id="tanggal"
                              name="tanggal"
                              type="date"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="nominal"
                                   value="Nominal"
                              />
                         </div>
                         <TextInput
                              id="nominal"
                              name="nominal"
                              placeholder="contoh: 10.000"
                              type="text"
                              value={nominal}
                              onChange={(e) => setNominal(e.target.value)}
                         />
                    </div>
                    <Button type="submit">
                         Submit
                    </Button>
               </form>
               {/* END: FORMULIR KEUANGAN */}

               {/* START: Memasukkan Data */}
               <div className="flex max-w-md flex-col mx-auto mt-10 mb-5">
                    <Table>
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
                         </Table.Head>
                         <Table.Body className="divide-y">
                              {savedData.length <= 0 ? (
                                   <tr>
                                        <td colSpan="3" className="text-center font-bold py-2">
                                             Data kosong!
                                        </td>
                                   </tr>
                              ) : (
                                   savedData.map((data, index) => (
                                        <DataNoteTable
                                             key={index}
                                             deskripsi={data.deskripsi}
                                             tanggal={data.tanggal}
                                             nominal={data.nominal}
                                        />
                                   ))
                              )}
                         </Table.Body>
                    </Table>
               </div>

               {/* END: Memasukkan Data */}
               <Footer />
          </>
     )
}

export default TakeNotes;