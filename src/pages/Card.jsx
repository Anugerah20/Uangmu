import { Card } from "flowbite-react";
import { BiSolidBadgeDollar, BiSolidPointer, BiSolidHappyAlt } from "react-icons/bi";

const CardList = () => {
     return (
          <>
               {/* START: FITUR */}
               <section className="sm:mx-20 md:mx-20 lg:mx-20 mt-5 sm:mt-10">
                    <div className="sm:mx-20 md:mx-8 lg:mx-24 mt-16 sm:mt-0 md:mt-0 ">
                         <h2 className="text-2xl font-bold mb-2 sm:mb-10 text-center sm:text-left text-sky-600">Kenapa Harus Uangmu</h2>
                    </div>
                    {/* END: LIST FITUR */}
                    <div className="row flex justify-evenly items-center flex-grow flex-wrap sm:flex-nowrap md:flex-wrap w-4/5 md:w-full mx-auto gap-5 md:gap-10 lg:gap-10">
                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiSolidBadgeDollar className="text-4xl text-sky-800" />
                                   </div>
                                   <h5 className="text-xl font-medium tracking-tight text-sky-800 dark:text-white">
                                        Tidak Dipungut Biaya
                                   </h5>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiSolidHappyAlt className="text-4xl text-sky-800" />
                                   </div>
                                   <h5 className="text-xl font-medium  tracking-tight text-sky-800 dark:text-white">
                                        Tersedia download PDF
                                   </h5>
                              </Card>
                         </div>

                         <div className="col flex text-center">
                              <Card>
                                   <div className="flex justify-center items-center">
                                        <BiSolidPointer className="text-4xl text-sky-800" />
                                   </div>
                                   <h5 className="text-xl font-medium  tracking-tight text-sky-800 dark:text-white">
                                        Dibuka Perangkat Apapun
                                   </h5>
                              </Card>
                         </div>
                    </div>
                    {/* END: LIST FITUR */}
               </section>
          </>
     )
}

export default CardList;
