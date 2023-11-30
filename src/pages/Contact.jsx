import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { Toaster, toast } from "sonner";

const Contact = () => {
     document.title = "Uangmu | Kontak";

     // Validation form
     const sendMessage = () => {
          toast.success("Pesan anda sudah terkirim", {
               duration: 2000,
          });
          formik.resetForm()
     }

     const formik = useFormik({
          initialValues: {
               username: "",
               email: "",
               message: "",
          },
          onSubmit: sendMessage,
          validationSchema: yup.object().shape({
               username: yup.string().required("Nama lengkap tidak boleh kosong").min(5, "Nama lengkap minimal 5 karakter").max(50),
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
               <h1 className="text-2xl mt-10 font-bold text-center">Kirim Pesanmu Disini</h1>
               <Toaster />
               {/* START: KONTAK */}
               <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-10">
                    <div>

                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-username"
                                   value="Nama Lengkap"
                              />

                         </div>
                         <TextInput
                              color="gray"
                              id="input-username"
                              name="username"
                              rightIcon={FaUserAlt}
                              type="text"
                              autoComplete="off"
                              onChange={handleForm}
                              value={formik.values.username}
                         />
                         {formik.errors.username && formik.touched.username && (
                              <div className="text-red-600 font-medium">{formik.errors.username}</div>
                         )}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-email"
                                   value="Email"
                              />
                         </div>
                         <TextInput
                              color="gray"
                              id="input-email"
                              name="email"
                              rightIcon={FaEnvelope}
                              type="email"
                              autoComplete="off"
                              onChange={handleForm}
                              value={formik.values.email}
                         />
                         {formik.errors.email && formik.touched.email && (
                              <div className="text-red-600 font-medium">{formik.errors.email}</div>
                         )}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   color="gray"
                                   htmlFor="input-message"
                                   value="Pesan"
                              />
                         </div>
                         <Textarea
                              color="gray"
                              id="input-message"
                              name="message"
                              className="text-sm"
                              rows={4}
                              autoComplete="off"
                              onChange={handleForm}
                              value={formik.values.message}
                         />
                         {formik.errors.message && formik.touched.message && (
                              <div className="text-red-600 font-medium">{formik.errors.message}</div>
                         )}
                    </div>

                    <Button color="success" type="submit">
                         kirim sekarang
                    </Button>
               </form>
               {/* END: KONTAK */}
          </>
     )
}

export default Contact;
