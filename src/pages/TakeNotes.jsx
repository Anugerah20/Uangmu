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
     const [editNoteId, setEditNoteId] = useState(null);
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

          // Save Note Localstorage
          const storageNotes = JSON.parse(localStorage.getItem("note")) || [];
          storageNotes.push(newDataNote);
          localStorage.setItem("note", JSON.stringify(storageNotes));

          // Notification Success
          toast.success('Catatan Uangmu berhasil dibuat', {
               duration: 2000,
          })
     };

     useEffect(() => {
          const storageNotes = JSON.parse(localStorage.getItem("note")) || [];
          setSavedData(storageNotes);

          // Calculate
          const totalPemasukan = storageNotes
               .filter((item) => item.jenis === 'pemasukan')
               .reduce((total, item) => total + parseFloat(item.nominal), 0);

          const totalPengeluaran = storageNotes
               .filter((item) => item.jenis === 'pengeluaran')
               .reduce((total, item) => total + parseFloat(item.nominal), 0);

          const totalUang = totalPemasukan - totalPengeluaran;

          setTotalPemasukan(totalPemasukan);
          setTotalPengeluaran(totalPengeluaran);
          setTotalUang(totalUang);
     }, [totalUang]);

     // Delete Note
     const deleteNote = (noteId) => {
          const updateData = savedData.filter((data) => data.id !== noteId);
          setSavedData(updateData);

          const updateLocalStorage = updateData.map((data) => {
               return {
                    id: data.id,
                    deskripsi: data.deskripsi,
                    tanggal: data.tanggal,
                    nominal: data.nominal,
                    jenis: data.jenis,
               };
          });
          localStorage.setItem('note', JSON.stringify(updateLocalStorage));

          // Reset money
          const updateTotalIncome = updateData
               .filter((item) => item.jenis === 'pemasukan')
               .reduce((total, item) => total + parseFloat(item.nominal), 0);
          const updateTotalExpenses = updateData
               .filter((item) => item.jenis === 'pengeluaran')
               .reduce((total, item) => total + parseFloat(item.nominal), 0)
          const updateTotalMoney = updateTotalIncome - updateTotalExpenses;

          // Update state
          setTotalPemasukan(updateTotalIncome);
          setTotalPengeluaran(updateTotalExpenses);
          setTotalUang(updateTotalMoney);

          // check selected month
          if (!updateData.some(data => new Date(data.tanggal).toLocaleString('id-ID', { month: 'long' }) === selectMonth)) {
               setSelectMonth('Semua Bulan');
          }

          toast.success('Catatan Uangmu berhasil dihapus', {
               duration: 2000,
          })
     }

     const editNote = (noteId) => {
          const editData = savedData.find((data) => data.id === noteId);
          if (editData) {
               setDeskripsi(editData.deskripsi);
               setTanggal(editData.tanggal);
               setNominal(editData.nominal);
               setJenisCatatan(editData.jenis);
               setEditNoteId(noteId);
               setOpenModal(true);
          }
     }

     // Handle Form Edit
     const handleEditSubmit = (e) => {
          e.preventDefault();
          const updatedData = savedData.map((data) => {
               if (data.id === editNoteId) {
                    return {
                         ...data,
                         deskripsi,
                         tanggal,
                         nominal: parseFloat(nominal),
                         jenis: jenisCatatan,
                    };
               }
               return data;
          });

          // Update Total Money
          const updatedMoney = updatedData.reduce((total, item) => {
               if (item.jenis === 'pemasukan') {
                    return total + parseFloat(item.nominal);
               } else {
                    if (item.id === editNoteId) {
                         return total - parseFloat(savedData.find((data) => data.id === editNoteId).nominal) + parseFloat(nominal);
                    } else {
                         return total - parseFloat(item.nominal)
                    }
               }
          }, 0);

          // save localStorage
          localStorage.setItem('note', JSON.stringify(updatedData));
          setSavedData(updatedData);
          setTotalUang(updatedMoney);

          // Reset SetState
          setDeskripsi('');
          setTanggal('');
          setNominal('');
          setJenisCatatan('');
          setEditNoteId(null);
          setOpenModal(false);

          toast.success('Catatan Uangmu berhasil diperbarui', {
               duration: 2000,
          })
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
                              <FilterMoney selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
                         </div>
                         {/* START: DOWNLOAD PDF */}
                         <DownloadPdf financialData={savedData} selectMonth={selectMonth} />
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
                                                       <td colSpan="5" className="border font-bold p-4 text-red-500">
                                                            Catatan uangmu tidak tersedia
                                                       </td>
                                                  </tr>
                                             ) : (
                                                  savedData
                                                       .map((data, index) => (
                                                            <DataNoteTable
                                                                 key={index}
                                                                 savedData={data}
                                                                 handleDelete={deleteNote}
                                                                 handleEdit={editNote}
                                                            />
                                                       ))
                                             )
                                        ) : (
                                             !savedData.some(data => new Date(data.tanggal).toLocaleString('id-ID', { month: 'long' }) === selectMonth) ? (
                                                  <tr>
                                                       <td colSpan="5" className="border font-bold p-4 text-red-500">
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
                                                                 handleDelete={deleteNote}
                                                                 handleEdit={editNote}
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
                         editNote={editNoteId}
                         handleEdit={handleEditSubmit}
                    />
                    {/* END: MODAL KEUANGAN */}

               </div >
          </>
     );
};

export default TakeNotes;
