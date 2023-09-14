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

               <form className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-5">
                    <div>

                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-gray"
                                   value="Nama Lengkap"
                              />
                         </div>
                         <TextInput
                              color="gray"
                              id="input-gray"
                              rightIcon={FaUserAlt}
                              required
                              type="text"
                              autoComplete="off"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-gray"
                                   value="Email"
                              />
                         </div>
                         <TextInput
                              color="gray"
                              id="input-gray"
                              rightIcon={FaEnvelope}
                              required
                              type="email"
                              autoComplete="off"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-gray"
                                   value="Pesan"
                              />
                         </div>
                         <Textarea
                              color="gray"
                              id="input-gray"
                              className="text-sm"
                              required
                              rows={4}
                              autoComplete="off"
                         />
                    </div>

                    <Button color="success" type="submit">
                         kirim sekarang
                    </Button>
               </form>

               {/* END: KONTAK */}
               <Footer />
          </>
     )
}

export default Contact;