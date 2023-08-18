import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Contact = () => {
     document.title = "Uangmu | Kontak";
     return (
          <>
               <Navigation />
               <h1 className="text-2xl font-bold text-center">Kontak</h1>
               {/* START: KONTAK */}
               <section className="text-center mt-8">
                    <a href="https://github.com/Anugerah20" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Github</a>
                    <a href="https://web.facebook.com/nabil.pangestu.359/" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Facebook</a>
                    <a href="https://instagram.com/anugerah" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Instagram</a>
               </section>
               {/* END: KONTAK */}
               <Footer />
          </>
     )
}

export default Contact;