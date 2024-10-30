/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import TotalMoney from "../components/TotalAmout";
import DataNoteTable from "../components/DataNoteTable";
import ModalNote from "../components/ModalNote";
import FilterMoney from "../components/FilterMoney";
import ChartMoney from "../components/ChartMoney";
import DownloadPdf from "../components/DownloadPdf";
// import AOS from "aos";
import "aos/dist/aos.css";
import { useApiGet, userApiDelete, userApiPost } from "../services/apiService";

const TakeNotes = () => {
     document.title = "Uangmu | Catatan";

     const [savedData, setSavedData] = useState([]);
     const [totalPemasukan, setTotalPemasukan] = useState(0);
     const [totalPengeluaran, setTotalPengeluaran] = useState(0);
     const [totalUang, setTotalUang] = useState(0);
     const [selectMonth, setSelectMonth] = useState("Semua Bulan");

     // State buat mengtrigger data catatan uang
     const [triggerEffect, setTriggerEffect] = useState(false);

     // State untuk pagination notes
     const [totalPage, setTotalPage] = useState(1);
     const [currentPage, setCurrentPage] = useState(1);
     const limit = 3;

     // State Memperbarui chart
     const [updateChart, setUpdateChart] = useState(false);

     // Fungsi buat menambahkan catatan keuangan baru
     const handleAddNote = async (newNote) => {
          // Logika penambahan data catatan dan perhitungan total uang
          try {
               const response = await userApiPost("/note", newNote);

               if (response.status === 200) {
                    setTriggerEffect(true);
                    setSavedData([...savedData, response.data]);
                    const notePrice = parseFloat(newNote.price);
                    const updateTotalUang = totalUang + (newNote.noteType === "Pemasukan" ? notePrice : -notePrice);

                    const updateTotalPemasukan = newNote.noteType === "Pemasukan" ? totalPemasukan + newNote.price : totalPemasukan;
                    const updateTotalPengeluaran = newNote.noteType === "Pengeluaran" ? totalPengeluaran + newNote.price : totalPengeluaran;

                    // Perbarui state total uang, pemasukan, dan pengeluaran
                    setTotalUang(updateTotalUang);
                    setTotalPemasukan(updateTotalPemasukan);
                    setTotalPengeluaran(updateTotalPengeluaran);

               } else {
                    console.log("Failed show total money :", response.data);
               }
          } catch (error) {
               console.log("Error add data total money :", error);
          }
     };

     // 1. Fungsi untuk mengambil data catatan dari backend
     // 2. Fungsi untuk mengambil id edit catatan
     const fetchData = async (page = 1, limit = 3) => {
          const userId = localStorage.getItem("userId");
          try {
               const response = await useApiGet(`/get-note/${userId}?page=${page}&limit=${limit}`);
               setSavedData(response?.data?.showNotes || []); // Jika tidak ada data maka set sebagai array kosong

               console.log("DATA NOTES: ", response.data.showNotes);

               // Memasukkan total halaman, halaman saat ini, dan limit data per halaman pagination
               // set total halaman, jika tidak tersedia set sebagai 1
               setTotalPage(response?.data?.totalPages || 1);

               // set halaman saat ini, jika tidak tersedia set sebagai 1
               setCurrentPage(response?.data?.currentPage || 1);
          } catch (error) {
               console.log("Error fetching data:", error);
          }
     };

     // Mengambil data catatan ketika halaman pertama dimuat
     useEffect(() => {
          fetchData(currentPage, limit);
     }, [triggerEffect, currentPage]);

     // Fungsi mengubah halaman catatan ketika pindah halaman
     const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
     }

     // Fungsi untuk menghapus data catatan berdasarkan id
     const handleDelete = async (id) => {
          const userId = localStorage.getItem("userId");
          try {
               const response = await userApiDelete(`/delete-note/${userId}`);
               if (response.status === 201) {
                    // Memperbarui data catatan setelah dihapus
                    const updatedData = savedData.filter((data) => data.id !== id);
                    setSavedData(updatedData);

                    window.location.href("/takenotes");
               }
          } catch (error) {
               console.error("Error deleting note: ", error);
          }
     }

     return (
          <>
               <div className="flex flex-wrap">

                    {/* START: TOTAL MONEY */}
                    <TotalMoney totalUang={totalUang} totalPemasukan={totalPemasukan} totalPengeluaran={totalPengeluaran}
                         selectMonth={selectMonth} savedData={savedData}
                    />
                    {/* END: TOTAL MONEY */}

                    {/* START: MEMASUKKAN DATA */}
                    <div className="flex flex-col mx-auto md:mt-12 sm:mt-0 lg:mt-12 w-[80%] sm:w-1/2 md:w-2/5 lg:w-[40%] max-h-96">
                         <div className="flex justify-between items-center flex-grow">
                              <FilterMoney selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
                         </div>

                         <div className="relative overflow-x-auto overflow-y-auto">
                              <table className="w-[100%] border-collapse border border-gray-300 rounded-md text-center overflow-x-auto ">
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
                                        {savedData.length === 0 ? (
                                             <tr>
                                                  <td colSpan="5" className="border p-4">
                                                       Catatan uangmu tidak tersedia
                                                  </td>
                                             </tr>
                                        ) : (
                                             savedData.map((data, index) => (
                                                  <DataNoteTable
                                                       key={index} savedData={data} onDelete={handleDelete}
                                                       onEdit={fetchData}
                                                       onSubmitSuccess={() => setTriggerEffect(!triggerEffect)}
                                                       setUpdateChart={setUpdateChart}
                                                  />
                                             ))
                                        )}
                                   </tbody>
                              </table>
                         </div>

                         {/* START: PAGINATION */}
                         <div className="flex justify-center mt-4">
                              <button
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   disabled={currentPage === 1}
                                   className={`${currentPage === 1 ? "bg-gray-300" : "bg-sky-500"} text-white w-20 h-10 rounded-md mr-2`}
                              >
                                   Previous
                              </button>

                              {savedData.length > 0 && (
                                   <span className="text-gray-400 font-semibold flex items-center justify-center text-center text-xs">Show {currentPage} to total page {totalPage}</span>
                              )}

                              <button
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   disabled={currentPage === totalPage}
                                   className={`${currentPage === totalPage ? "bg-gray-300 ml-2" : "bg-sky-500 ml-2"} text-white px-4 py-2 rounded-md mr-2`}
                              >
                                   Next
                              </button>
                         </div>
                         {/* END: PAGINATION */}
                    </div>
                    {/* END: MEMASUKKAN DATA */}

                    {/* START: MODAL KEUANGAN */}
                    <ModalNote
                         handleAddNote={handleAddNote}
                         onSubmitSuccess={() => setTriggerEffect(!triggerEffect)}
                    />
                    {/* END: MODAL KEUANGAN */}

               </div>

               {/* START: CHART */}
               <div className="flex justify-center flex-col">
                    <ChartMoney
                         updateChart={updateChart}
                    />
               </div>
               {/* END: CHART */}
          </>
     );
};

export default TakeNotes;