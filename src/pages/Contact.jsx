import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";

const Contact = () => {
     document.title = "Uangmu | Kontak";

     // Validation form
     const sendMessage = () => {
          alert("Pesan anda sudah terkirim");
     }

     const formik = useFormik({
          initialValues: {
               username: "",
               email: "",
               message: "",
          },
          onSubmit: sendMessage,
          validationSchema: yup.object().shape({
               username: yup.string().required("Nama lengkap tidak boleh kosong").min(10).max(50),
               email: yup.string().required("Email tidak boleh kosong").email(),
               message: yup.string().required("Pesan tidak boleh kosong")
          }),
     });

     const handleForm = (e) => {
          const { target } = e;
          formik.setFieldValue(target.name, target.value);
     };

     return (
          <>
               <Navigation />
               <h1 className="text-2xl font-bold text-center">Kirim Pesanmu Disini</h1>
               {/* START: KONTAK */}

               <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-5">
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
                              name="username"
                              rightIcon={FaUserAlt}
                              required
                              type="text"
                              autoComplete="off"
                              onChange={handleForm}
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
                              name="email"
                              rightIcon={FaEnvelope}
                              required
                              type="email"
                              autoComplete="off"
                              onChange={handleForm}
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
                              name="message"
                              className="text-sm"
                              required
                              rows={4}
                              autoComplete="off"
                              onChange={handleForm}
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