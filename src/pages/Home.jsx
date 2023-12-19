import CardList from "./Card";
import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";

const Home = () => {
     document.title = "Uangmu | Beranda";

     useEffect(() => {
          AOS.init();
     }, []);
     return (
          <div
               data-aos="fade-up"
               data-aos-offset="200"
               data-aos-delay="50"
               data-aos-duration="1000"
          >
               {/* START: DESKRIPSI */}
               <section className="text-center">
                    <h1 className="text-4xl font-bold mt-10">Uangmu</h1>
                    <p className="text-xl mt-5 w-4/5 md:w-4/5 mx-auto sm:w-full">Sekarang kamu bisa mencatat keuangan kamu disini, tanpa perlu menginstall aplikasi</p>
                    <CardList />
               </section>
               {/* END: DESKRIPSI */}
          </div>
     )
}

export default Home;