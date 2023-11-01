import { Card } from "flowbite-react";

const TotalAmout = ({ totalUang, totalPemasukan, totalPengeluaran }) => {
     const numberFormatAmount = (number) => {
          return new Intl.NumberFormat("id-ID").format(number);
     }
     return (
          <Card className="w-4/5 sm:w-1/2 md:w-2/5 card-note">
               <h1 className="text-center text-2xl">Total Uang Sekarang</h1>
               <hr />
               <h2 className="text-center text-xl font-bold">Rp {totalUang !== 0 ? numberFormatAmount(totalUang) : 0}</h2>
               <section className="flex flex-wrap justify-between">
                    <div className="income">
                         <h5>🟢Income</h5>
                         <small className="ml-5 font-bold">Rp {numberFormatAmount(totalPemasukan)}</small>
                    </div>
                    <div className="expenses">
                         <h5>🔴Expenses</h5>
                         <small className="ml-5 font-bold">Rp {numberFormatAmount(totalPengeluaran)}</small>
                    </div>
               </section>
          </Card>
     )
}

export default TotalAmout;