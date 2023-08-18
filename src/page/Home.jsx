import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card } from "flowbite-react";
import { BiInfinite } from "react-icons/bi";

const Home = () => {
     document.title = "Uangmu | Beranda";
     return (
          <>
               {/* START: DESKRIPSI */}
               <Navigation />
               <section className="text-center">
                    <h1 className="text-4xl font-bold mt-10">Uangmu</h1>
                    <p className="text-xl mt-5 w-full md:w-4/5 mx-auto sm:w-full">Sekarang kamu bisa mencatat keuangan kamu disini, tanpa perlu menginstall aplikasi</p>
               </section>
               {/* END: DESKRIPSI */}

               {/* START: FITUR */}
               <section className="mx-5 sm:mx-20 mt-5 sm:mt-10">
                    <h2 className="text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">Uangmu Menyediakan</h2>
                    {/* END: LIST FITUR */}
                    <div className="row flex justify-between items-center flex-grow flex-wrap sm:flex-nowrap w-4/5 md:w-full mx-auto gap-2 md:gap-10">
                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="tetext-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <p>
                                             Unlimited
                                        </p>
                                   </h5>
                                   <p className="font-normal text-gray-700 dark:text-gray-400">
                                        <p>
                                             Kamu bisa membuat catatan uang sesukamu tidak ada batasan waktu dan tidak dipungut biaya % pun
                                        </p>
                                   </p>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="tetext-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <p>
                                             Unlimited
                                        </p>
                                   </h5>
                                   <p className="font-normal text-gray-700 dark:text-gray-400">
                                        <p>
                                             Kamu bisa membuat catatan uang sesukamu tidak ada batasan waktu dan tidak dipungut biaya % pun
                                        </p>
                                   </p>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="tetext-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <p>
                                             Unlimited
                                        </p>
                                   </h5>
                                   <p className="font-normal text-gray-700 dark:text-gray-400">
                                        <p>
                                             Kamu bisa membuat catatan uang sesukamu tidak ada batasan waktu dan tidak dipungut biaya % pun
                                        </p>
                                   </p>
                              </Card>
                         </div>
                    </div>
                    {/* END: LIST FITUR */}
               </section>

               {/* START: FITUR */}

               <Footer />
          </>
     )
}

export default Home;
