import { useState, useEffect } from "react";
import { TbSquareArrowDown } from "react-icons/tb";
import { TbSquareArrowUp } from "react-icons/tb";
import { formatToIDR } from "../utils/currencyMoney";

const TotalAmout = ({ totalPemasukan, totalPengeluaran, selectMonth, savedData }) => {
     const [filterTotalPemasukan, setFilterTotalPemasukan] = useState(totalPemasukan);
     const [filterTotalPengeluaran, setFilterTotalPengeluaran] = useState(totalPengeluaran);

     useEffect(() => {
          // Calculate pemasukan & pengeluaran
          const filterPemasukan = savedData
               .filter((data) => {
                    return (
                         (selectMonth === "Semua Bulan" ||
                              new Date(data.date).toLocaleString("id-ID", { month: "long" }) === selectMonth) &&
                         data.noteType === "Pemasukan"
                    );
               })
               .reduce((total, data) => total + data.price, 0);

          const filterPengeluaran = savedData
               .filter((data) => {
                    return (
                         (selectMonth === "Semua Bulan" ||
                              new Date(data.date).toLocaleString("id-ID", { month: "long" }) === selectMonth) &&
                         data.noteType === "Pengeluaran"
                    );
               })
               .reduce((total, data) => total + data.price, 0);

          setFilterTotalPemasukan(filterPemasukan);
          setFilterTotalPengeluaran(filterPengeluaran);

     }, [savedData, selectMonth])
     // Filter total uang
     const filterTotalUang = filterTotalPemasukan - filterTotalPengeluaran;

     return (
          <div className="w-4/5 sm:w-1/2 md:w-2/5 h-48 card-note space-y-4 shadow-md p-4 bg-gradient-to-l from-indigo-500 to-teal-400 text-white">
               <h1 className="text-center text-2xl">Total Uang Sekarang</h1>
               <h2 className="text-center text-xl font-bold">{formatToIDR(filterTotalUang)}</h2>
               <section className="flex flex-wrap justify-between">
                    <div className="income">
                         <div className="flex items-center">
                              <h5 className="flex items-center gap-1"><TbSquareArrowUp className="text-2xl" />Pemasukan</h5>
                         </div>
                         <small className="font-bold">{formatToIDR(filterTotalPemasukan)}</small>
                    </div>
                    <div className="expenses">
                         <div className="flex items-center">
                              <h5 className="flex items-center gap-1"><TbSquareArrowDown className="text-2xl" />Pengeluaran</h5>
                         </div>
                         <small className="font-bold">{formatToIDR(filterTotalPengeluaran)}</small>
                    </div>
               </section>
          </div>
     )
}

export default TotalAmout;
