import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userApiPost } from '../../services/apiService';
import { Alert } from 'flowbite-react';

export default function ForgotPassword() {
     document.title = "Uangmu | Forgot Password";

     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);
     const [error, setError] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const onSubmit = async (data) => {
          const datas = {
               email: data.email
          }

          try {
               setLoading(true);
               const response = await userApiPost("/forgot-password", datas, {
                    headers: {
                         "Content-Type": "application/json",
                    }
               });
               console.log("Response Forgot password", response);

               if (response.status === 200 && response.data) {
                    setSuccess(true);
                    reset();
               }

               setLoading(false);

          } catch (error) {
               console.log("Forgot password error: ", error);

               if (error.response && error.response.status === 400) {
                    setError(true);
                    reset();
               }

               setLoading(false);
          }
     }

     return (
          <div className="h-screen flex justify-center items-center">
               <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto py-10">
                    <h1 className="text-2xl font-bold mb-8">Forgot Password <span className="text-sky-500 border-b-2 border-sky-500">Uangmu</span></h1>

                    <div className="flex items-center gap-2 my-4">
                         <label htmlFor="login">Do you have an account? <a href="/login" className="text-sky-500 font-bold"> Login</a></label>
                    </div>
                    {success &&
                         <div className="alert">
                              <Alert
                                   color="success"
                                   onDismiss={() => setSuccess(false)}
                              >
                                   <span>
                                        <p>
                                             Link reset password telah dikirim ke email anda, silahkan cek email anda.
                                        </p>
                                   </span>
                              </Alert>
                         </div>
                    }
                    {error &&
                         <div className="alert">
                              <Alert
                                   color="failure"
                                   onDismiss={() => setError(false)}
                              >
                                   <span>
                                        <p>
                                             Email yang anda masukan tidak terdaftar.
                                        </p>
                                   </span>
                              </Alert>
                         </div>
                    }
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="email">Email</label>
                         </div>
                         <input id="email" type="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })} autoFocus />
                         {errors.email && errors.email.type === "required" && <span className="text-sm text-red-400">Email required</span>}
                         {errors.email && errors.email.type === "pattern" && <span className="text-sm text-red-400">Invalid Email</span>}
                    </div>
                    <div className="mt-2 block">
                         <button type="submit" className="btn-login">{loading ? "Process..." : "Forgot Password"}</button>
                    </div>
               </form>
          </div>
     )
}
