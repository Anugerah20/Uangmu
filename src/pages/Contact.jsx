import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";

const Contact = () => {
     document.title = "Uangmu | Kontak";
     return (
          <>
               <Navigation />
               <h1 className="text-2xl font-bold text-center">Kirim Pesanmu Disini</h1>
               {/* START: KONTAK */}

               {/* <section className="text-center mt-8">
                    <a href="https://github.com/Anugerah20" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Github</a>
                    <a href="https://web.facebook.com/nabil.pangestu.359/" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Facebook</a>
                    <a href="https://instagram.com/anugerah" target="_blank" className="py-2 px-4 bg-black text-white rounded-md me-3">✔️ Instagram</a>
               </section> */}

               {/* Updated Contact */}
               <form className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-5">
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="text"
                                   value="Nama Lengkap"
                              />
                         </div>
                         <TextInput
                              rightIcon={FaUserAlt}
                              id="text"
                              required
                              type="text"
                              autoComplete="off"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="email"
                                   value="Email"
                              />
                         </div>
                         <TextInput
                              rightIcon={FaEnvelope}
                              id="email"
                              required
                              type="email"
                              autoComplete="off"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="massage"
                                   value="Pesan"
                              />
                         </div>
                         <Textarea
                              className="text-sm"
                              id="massage"
                              required
                              rows={4}
                              autoComplete="off"
                         />
                    </div>

                    <Button type="submit">
                         kirim sekarang
                    </Button>
               </form>
               {/* Updated Contact */}

               {/* END: KONTAK */}
               <Footer />
          </>
     )
}

export default Contact;