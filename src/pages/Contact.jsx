import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import { userApiPost } from "../services/apiService";

const Contact = () => {
     document.title = "Uangmu | Kontak";

     // Validation form
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     // Submit form contact
     const onSubmit = async (data) => {
          try {
               const contactData = {
                    fullname: data.fullname,
                    email: data.email,
                    message: data.message
               };

               const response = await userApiPost("/contact", contactData);

               // Check status send message
               if (response.status === 201) {
                    toast.success("Pesan berhasil terkirim");
                    reset();
               } else {
                    toast.error("Pesan gagal terkirim");
               }
          } catch (error) {
               toast.error("Pesan gagal terkirim");
          }
     };

     // Animation AOS
     useEffect(() => {
          AOS.init();
     }, []);

     return (
          <div
               data-aos="fade-up"
               data-aos-offset="200"
               data-aos-delay="100"
               data-aos-duration="1000"
          >
               <h1 className="text-2xl mt-10 font-bold text-center text-sky-600">Kirim Pesanmu Disini</h1>
               <Toaster />
               {/* START: KONTAK */}
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-10">
                    <div>

                         <div className="mb-2 block">
                              <label htmlFor="username">Nama Lengkap</label>
                         </div>
                         <input
                              type="text"
                              id="fullname"
                              autoComplete="off"
                              {...register("fullname", { required: true, minLength: 5 })} autoFocus
                         />
                         {errors.fullname && errors.fullname.type === "required" && <span className="text-sm text-red-400">fullname required</span>}
                         {errors.fullname && errors.fullname.type === "minLength" && <span className="text-sm text-red-400">fullname min 5 character</span>}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="email">Email</label>
                         </div>
                         <input
                              id="email"
                              type="email"
                              autoComplete="off"
                              {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })}
                         />
                         {errors.email && errors.email.type === "required" && <span className="text-sm text-red-400">Email required</span>}
                         {errors.email && errors.email.type === "pattern" && <span className="text-sm text-red-400">Invalid Email</span>}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="message">Pesan</label>
                         </div>
                         <textarea
                              id="message"
                              rows={4}
                              autoComplete="off"
                              {...register("message", { required: true, minLength: 5 })}
                         />
                         {errors.message && errors.message.type === "required" && <span className="text-sm text-red-400">Message required</span>}
                         {errors.message && errors.message.type === "minLength" && <span className="text-sm text-red-400">Message min 15 character</span>}
                    </div>

                    <button className="btn-contact" type="submit">
                         kirim sekarang
                    </button>
               </form>
               {/* END: KONTAK */}
          </div>
     )
}

export default Contact;
