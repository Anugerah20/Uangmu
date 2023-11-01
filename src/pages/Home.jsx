import CardList from "./Card";

const Home = () => {
     document.title = "Uangmu | Beranda";
     return (
          <>
               {/* START: DESKRIPSI */}
               <section className="text-center">
                    <h1 className="text-4xl font-bold mt-10">Uangmu</h1>
                    <p className="text-xl mt-5 w-4/5 md:w-4/5 mx-auto sm:w-full">Sekarang kamu bisa mencatat keuangan kamu disini, tanpa perlu menginstall aplikasi</p>
                    <CardList />
               </section>
               {/* END: DESKRIPSI */}
          </>
     )
}

export default Home;