import { Card } from "flowbite-react";
import { useState, useEffect } from "react";

const TotalAmout = ({ totalUang, totalPemasukan, totalPengeluaran, selectMonth, savedData }) => {
     const [filterTotalPemasukan, setFilterTotalPemasukan] = useState(totalPemasukan);
     const [filterTotalPengeluaran, setFilterTotalPengeluaran] = useState(totalPengeluaran);

     const numberFormatAmount = (number) => {
          return new Intl.NumberFormat("id-ID").format(number);
     }

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
          <Card className="w-4/5 sm:w-1/2 md:w-2/5 card-note">
               <h1 className="text-center text-2xl">Total Uang Sekarang</h1>
               <hr />
               <h2 className="text-center text-xl font-bold">Rp {numberFormatAmount(filterTotalUang)}</h2>
               <section className="flex flex-wrap justify-between">
                    <div className="income">
                         <h5>🟢Income</h5>
                         <small className="ml-5 font-bold">Rp {numberFormatAmount(filterTotalPemasukan)}</small>
                    </div>
                    <div className="expenses">
                         <h5>🔴Expenses</h5>
                         <small className="ml-5 font-bold">Rp {numberFormatAmount(filterTotalPengeluaran)}</small>
                    </div>
               </section>
          </Card>
     )
}

export default TotalAmout;
