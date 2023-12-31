import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";

const Contact = () => {
     document.title = "Uangmu | Kontak";

     // Validation form
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const onSubmit = () => {
          toast.success("Pesan berhasil terkirim");
          reset();
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
               <h1 className="text-2xl mt-10 font-bold text-center">Kirim Pesanmu Disini</h1>
               <Toaster />
               {/* START: KONTAK */}
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mx-auto w-4/5 sm:max-w-md mt-10">
                    <div>

                         <div className="mb-2 block">
                              <label htmlFor="username">Nama Lengkap</label>
                         </div>
                         <input
                              type="text"
                              id="username"
                              autoComplete="off"
                              {...register("username", { required: true, minLength: 5 })} autoFocus
                         />
                         {errors.username && errors.username.type === "required" && <span className="text-sm text-red-400">Username required</span>}
                         {errors.username && errors.username.type === "minLength" && <span className="text-sm text-red-400">Username min 5 character</span>}
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
                              {...register("message", { required: true, minLength: 15 })}
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
