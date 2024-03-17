import { useEffect, useState } from 'react';
import TotalMoney from '../components/TotalAmout';
import DataNoteTable from '../components/DataNoteTable';
import ModalNote from '../components/ModalNote';
import FilterMoney from '../components/FilterMoney';
import { Toaster, toast } from 'sonner';
import DownloadPdf from '../components/DownloadPdf';
import AOS from "aos";
import "aos/dist/aos.css"

const TakeNotes = () => {
     document.title = 'Uangmu | Catatan';

     useEffect(() => {
          AOS.init();
     }, []);

     const [deskripsi, setDeskripsi] = useState('');
     const [tanggal, setTanggal] = useState('');
     const [nominal, setNominal] = useState('');
     const [savedData, setSavedData] = useState([]);
     const [openModal, setOpenModal] = useState(false);
     const [jenisCatatan, setJenisCatatan] = useState('');
     const [totalPemasukan, setTotalPemasukan] = useState(0);
     const [totalPengeluaran, setTotalPengeluaran] = useState(0);
     const [totalUang, setTotalUang] = useState(0);
     const [selectMonth, setSelectMonth] = useState('Semua Bulan');

     // State Input
     const handlerInputChange = (e, inputName) => {
          const newValue = e.target.value;
          switch (inputName) {
               case 'deskripsi':
                    setDeskripsi(newValue);
                    break;
               case 'tanggal':
                    setTanggal(newValue);
                    break;
               case 'nominal':
                    setNominal(newValue);
                    break;
               case 'jenisCatatan':
                    setJenisCatatan(newValue);
                    break;
               default:
                    break;
          }
     }

     // Validation input
     const handleSubmit = (e) => {
          e.preventDefault();

          if (deskripsi === '' || tanggal === '' || nominal === '' || jenisCatatan === '') {
               toast.error('Semua harus diisi', {
                    duration: 2000,
               });
               return;
          }

          if (isNaN(nominal)) {
               toast.error('Nominal hanya menerima angka', {
                    duration: 2000,
               });
               return;
          }

          const uniqueId = Math.random();
          const newDataNote = {
               id: uniqueId,
               deskripsi,
               tanggal,
               nominal: parseFloat(nominal),
               jenis: jenisCatatan,
          };

          let totalUangBaru = totalUang;

          if (jenisCatatan === 'pemasukan') {
               setTotalPemasukan(totalPemasukan + newDataNote.nominal);
               totalUangBaru += newDataNote.nominal;
          } else {
               setTotalPengeluaran(totalPengeluaran + newDataNote.nominal);
               totalUangBaru -= newDataNote.nominal;
          }

          setTotalUang(totalUangBaru);

          const updatedData = [...savedData, newDataNote];
          setSavedData(updatedData);

          setDeskripsi('');
          setTanggal('');
          setNominal('');
          setJenisCatatan('');
          setOpenModal(false);

          // Notification Success
          toast.success('Catatan Uangmu berhasil dibuat', {
               duration: 2000,
          });
     }

     return (
          <>
               <div
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                    className="flex flex-wrap">
                    <Toaster />

                    {/* START: TOTAL MONEY */}
                    <TotalMoney totalUang={totalUang} totalPemasukan={totalPemasukan} totalPengeluaran={totalPengeluaran}
                         selectMonth={selectMonth} savedData={savedData}
                    />
                    {/* END: TOTAL MONEY */}

                    {/* START: MEMASUKKAN DATA */}
                    <div className="flex flex-col mx-auto md:mt-12 sm:mt-0 lg:mt-12 w-[80%] sm:w-1/2 md:w-2/5 lg:w-[40%]">
                         <div className="mb-5">
                              <div className="flex justify-between items-center">
                                   <FilterMoney selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
                                   <DownloadPdf financialData={savedData} selectMonth={selectMonth} />
                              </div>
                         </div>
                         {/* START: DOWNLOAD PDF */}
                         {/* END: DOWNLOAD PDF */}
                         <div className="relative overflow-x-auto">
                              <table className="w-[100%] border-collapse border border-gray-300 rounded-md text-center overflow-x-auto">
                                   <thead className="border">
                                        <tr>
                                             <th className="border-gray-300 px-6 py-3">Deskripsi</th>
                                             <th className="border-gray-300 px-6 py-3">Tanggal</th>
                                             <th className="border-gray-300 px-6 py-3">Nominal</th>
                                             <th className="border-gray-300 px-6 py-3">Jenis</th>
                                             <th className="border-gray-300 px-6 py-3">Aksi</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {/* Month filter */}
                                        {selectMonth === 'Semua Bulan' ? (
                                             savedData.length === 0 ? (
                                                  <tr>
                                                       <td colSpan="5" className="border font-bold p-4">
                                                            Catatan uangmu tidak tersedia
                                                       </td>
                                                  </tr>
                                             ) : (
                                                  savedData
                                                       .map((data, index) => (
                                                            <DataNoteTable
                                                                 key={index}
                                                                 savedData={data}
                                                            // handleDelete={deleteNote}
                                                            // handleEdit={editNote}
                                                            />
                                                       ))
                                             )
                                        ) : (
                                             !savedData.some(data => new Date(data.tanggal).toLocaleString('id-ID', { month: 'long' }) === selectMonth) ? (
                                                  <tr>
                                                       <td colSpan="5" className="border font-bold p-4">
                                                            Catatan uangmu tidak tersedia
                                                       </td>
                                                  </tr>
                                             ) : (
                                                  savedData
                                                       .filter(data => new Date(data.tanggal).toLocaleString('id-ID', { month: 'long' }) === selectMonth)
                                                       .map((data, index) => (
                                                            <DataNoteTable
                                                                 key={index}
                                                                 savedData={data}
                                                            // handleDelete={deleteNote}
                                                            // handleEdit={editNote}
                                                            />
                                                       ))
                                             )
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div >
                    {/* END: MEMASUKKAN DATA */}

                    {/* START: MODAL KEUANGAN */}
                    <ModalNote
                         openModal={openModal}
                         setOpenModal={setOpenModal}
                         deskripsi={deskripsi}
                         tanggal={tanggal}
                         nominal={nominal}
                         jenisCatatan={jenisCatatan}
                         setJenisCatatan={setJenisCatatan}
                         handlerInputChange={handlerInputChange}
                         handleSubmit={handleSubmit}
                    />
                    {/* END: MODAL KEUANGAN */}

               </div >
          </>
     );
};

export default TakeNotes;
