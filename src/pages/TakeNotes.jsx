import { useEffect, useState } from "react";
import TotalMoney from "../components/TotalAmout";
import DataNoteTable from "../components/DataNoteTable";
import ModalNote from "../components/ModalNote";
import FilterMoney from "../components/FilterMoney";
import DownloadPdf from "../components/DownloadPdf";
import AOS from "aos";
import "aos/dist/aos.css";
import { useApiGet, userApiPost } from "../services/apiService";

const TakeNotes = () => {
     document.title = "Uangmu | Catatan";

     const [savedData, setSavedData] = useState([]);
     const [totalPemasukan, setTotalPemasukan] = useState(0);
     const [totalPengeluaran, setTotalPengeluaran] = useState(0);
     const [totalUang, setTotalUang] = useState(0);
     const [selectMonth, setSelectMonth] = useState("Semua Bulan");

     const handleAddNote = async (newNote) => {
          // Logika penambahan data catatan dan perhitungan total uang
          try {
               const response = await userApiPost("/note", newNote);

               if (response.status === 200) {
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
                    console.error("Failed show total money :", response.data);
               }
          } catch (error) {
               console.error("Error add data total money :", error);
          }
     };

     useEffect(() => {
          // Fungsi untuk mengambil data catatan dari backend
          const fetchData = async () => {
               const userId = localStorage.getItem("userId");
               try {
                    const response = await useApiGet(`/get-note/${userId}`);
                    setSavedData(response.data.showNotes);
               } catch (error) {
                    console.error("Error fetching data:", error);
               }
          };

          fetchData();

     }, []);

     // useEffect(() => {
     //      AOS.init();
     // }, []);

     return (
          <>
               <div
                    // data-aos="fade-up"
                    // data-aos-offset="200"
                    // data-aos-delay="100"
                    // data-aos-duration="1000"
                    className="flex flex-wrap">

                    {/* START: TOTAL MONEY */}
                    <TotalMoney totalUang={totalUang} totalPemasukan={totalPemasukan} totalPengeluaran={totalPengeluaran}
                         selectMonth={selectMonth} savedData={savedData}
                    />
                    {/* END: TOTAL MONEY */}

                    {/* START: MEMASUKKAN DATA */}
                    <div className="flex flex-col mx-auto md:mt-12 sm:mt-0 lg:mt-12 w-[80%] sm:w-1/2 md:w-2/5 lg:w-[40%]">
                         <div className="mb-5">
                              {/* START: DOWNLOAD PDF */}
                              <div className="flex justify-between items-center">
                                   <FilterMoney selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
                                   <DownloadPdf financialData={savedData} selectMonth={selectMonth} />
                              </div>
                         </div>
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
                                        {/* Condition for displaying message if no data available */}
                                        {savedData && savedData.length === 0 ? (
                                             <tr>
                                                  <td colSpan="5" className="border font-bold p-4">
                                                       Catatan uangmu tidak tersedia
                                                  </td>
                                             </tr>
                                        ) : (
                                             // Render your data here
                                             savedData.map((data, index) => (
                                                  <DataNoteTable key={index} savedData={data} />
                                             ))
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
                    {/* END: MEMASUKKAN DATA */}

                    {/* START: MODAL KEUANGAN */}
                    <ModalNote
                         handleAddNote={handleAddNote}
                    />
                    {/* END: MODAL KEUANGAN */}

               </div>
          </>
     );
};

export default TakeNotes;
