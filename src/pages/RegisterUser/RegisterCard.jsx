import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { userApiPost } from "../../services/apiService";
import { useState } from "react";

export default function RegisterCard() {
     document.title = "Uangmu | Register";

     const [loading, setLoading] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const onSubmit = async (data) => {
          try {
               setLoading(true);

               const registerData = {
                    fullname: data.username,
                    email: data.email,
                    password: data.password,
               };

               const response = await userApiPost("/register", registerData);
               console.log("Data register: ", response);

               if (response && response.data.token) {
                    localStorage.setItem("tokenUser", response.data.token);
                    localStorage.setItem("userId", response.data.user.id);

                    toast.success("Register Successfully");
                    setTimeout(() => {
                         window.location.href = "/takenotes";
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

               const duplicateEmail = data.email;
               if (duplicateEmail) {
                    toast.error("Email already registered, use another email address");
                    reset();
                    return;
               }
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="h-screen flex justify-center items-center">
               <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto py-10">
                    <h1 className="text-2xl font-bold mb-8">Register <span className="text-sky-500 border-b-2 border-sky-500">Uangmu</span></h1>
                    <div className="flex items-center gap-2 my-4">
                         <label htmlFor="login">Do you have an account? <a href="/login" className="text-sky-500 font-bold"> Login</a></label>
                    </div>
                    <div>
                         <div className="mb-1 block">
                              <label htmlFor="username" className="text-sm font-medium">Username</label>
                         </div>
                         <input type="text" id="username" {...register("username", { required: true, minLength: 5 })} autoFocus />
                         {errors.username && errors.username.type === "required" && <span className="text-sm text-red-400">Username required</span>}
                         {errors.username && errors.username.type === "minLength" && <span className="text-sm text-red-400">Username min 5 character</span>}
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="email">Email</label>
                         </div>
                         <input id="email" type="email" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })} />
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
                    <div className="mt-2 block">
                         <button type="submit" className="btn-login">{loading ? "Process..." : "Register"}
                         </button>
                    </div>
               </form>
          </div>
     );
}