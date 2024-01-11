import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userApiPost } from '../../services/apiService';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function LoginCard() {

     const [loading, setLoading] = useState(false);

     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const onSubmit = async (data) => {
          try {
               setLoading(true);

               const loginData = {
                    email: data.email,
                    password: data.password,
               };

               const response = await userApiPost("/login", loginData);
               console.log("Data login: ", response);

               if (response && response.data.token) {
                    localStorage.setItem("tokenUser", response.data.token);
                    localStorage.setItem("userId", response.data.checkUser.id);

                    console.log("Token User Login: ", response.data.token);

                    toast.success("Login Successfully");
                    setTimeout(() => {
                         navigate("/takenotes");
                    }, 500);
                    reset();
               }
          } catch (error) {
               if (error.message === "Network Error") {
                    toast.error("Internal Server Error");
                    console.log("Internal Server Error: ", error);
                    reset();
                    return;
               }

               const checkEmail = data.email;
               const checkPassword = data.password;
               if (checkEmail || checkPassword) {
                    toast.error("Wrong email or password");
                    reset();
                    return;
               }
          } finally {
               // Reset loading if process success or failed
               setLoading(false);
          }
     };

     return (
          <div className="h-screen flex justify-center items-center">
               <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto py-10">
                    <h1 className="text-2xl font-bold mb-8">LOGIN <span className="text-sky-500 border-b-2 border-sky-500">UANGMU</span></h1>
                    <Toaster />
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="email">Email</label>
                         </div>
                         <input id="email" type="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })} autoFocus />
                         {errors.email && errors.email.type === "required" && <span className="text-sm text-red-400">Email required</span>}
                         {errors.email && errors.email.type === "pattern" && <span className="text-sm text-red-400">Invalid Email</span>}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="password">Password</label>
                         </div>
                         <input id="password" type="password" {...register("password", { required: true, minLength: 8 })} />
                         {errors.password && errors.password.type === "required" && <span className="text-sm text-red-400">Password required</span>}
                         {errors.password && errors.password.type === "minLength" && <span className="text-sm text-red-400">Password min 8 character</span>}
                    </div>
                    <div className="flex items-center gap-2 my-4">
                         <label htmlFor="login">Don't have an account? <a href="/register" className="text-sky-500 font-bold"> register</a></label>
                    </div>
                    <button type="submit" className="btn-login">{loading ? "Process..." : "Login"}</button>
               </form>
          </div>
     );
}