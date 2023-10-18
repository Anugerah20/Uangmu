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
                    <p className="text-xl mt-5 w-4/5 md:w-4/5 mx-auto sm:w-full">Sekarang kamu bisa mencatat keuangan kamu disini, tanpa perlu menginstall aplikasi</p>
               </section>
               {/* END: DESKRIPSI */}

               {/* START: FITUR */}
               <section className="mx-5 sm:mx-20 mt-5 sm:mt-10">
                    <h2 className="text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left sm:ml-0 lg:ml-[5.5rem]">Uangmu Menyediakan</h2>
                    {/* END: LIST FITUR */}
                    <div className="row flex justify-evenly items-center flex-grow flex-wrap sm:flex-nowrap w-4/5 md:w-full mx-auto gap-2 md:gap-10">
                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Tidak Dipungut Biaya 0%
                                   </h5>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Mudah Untuk Digunakan
                                   </h5>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiInfinite className="text-7xl" />
                                   </div>
                                   <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        Dibuka Perangkat Apapun
                                   </h5>
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
