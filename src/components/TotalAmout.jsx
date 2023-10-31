import { Card } from "flowbite-react";

const TotalAmout = ({ totalUang, totalPemasukan, totalPengeluaran }) => {
     const numberFormatAmount = (number) => {
          return new Intl.NumberFormat("id-ID").format(number);
     }
     return (
          <Card className="w-4/5 sm:w-1/2 md:w-2/5 card-note">
               <h1 className="text-center text-2xl font-bold">Total Uang Sekarang</h1>
               <hr />
               <h2 className="text-center text-xl">Rp {totalUang !== 0 ? numberFormatAmount(totalUang) : 0}</h2>
               <section className="flex flex-wrap justify-between">
                    <div className="income">
                         <h5>🟢Income</h5>
                         <p>{numberFormatAmount(totalPemasukan)}</p>
                    </div>
                    <div className="expenses">
                         <h5>🔴Expenses</h5>
                         <p>{numberFormatAmount(totalPengeluaran)}</p>
                    </div>
               </section>
          </Card>
     )
}

export default TotalAmout