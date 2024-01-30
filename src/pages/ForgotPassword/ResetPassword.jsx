import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useApiGet, userApiPost } from '../../services/apiService';

export default function ResetPassword() {

     const {
          register,
          handleSubmit,
          formState: { errors },
          watch,
     } = useForm();

     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);

     // Check password 
     const password = watch("password", "");

     const location = useLocation();

     const params = new URLSearchParams(location.search);

     const token = params.get('token');

     const decode = jwtDecode(token);

     const userId = decode.userId;

     const navigate = useNavigate();


     const checkToken = async () => {
          try {
               const response = await useApiGet(`/check-token/${token}`);
               console.log("Isi response", response);

               if (response.data.status === false) {
                    navigate('/login');
               }

          } catch (error) {
               console.log("Error Token Reset Password : ", error)
          }
     }

     const onSubmit = async (data) => {
          const newPassword = {
               password: data.password,
               token,
               userId,
          }

          try {
               setLoading(true);
               const response = await userApiPost('/update-password', newPassword);

               if (response.status === 200 && response.data.status === true) {
                    setSuccess(true);
               }

               setLoading(false);

          } catch (error) {
               console.log("Error Update Password : ", error);
               setLoading(false);
          }
     };

     useEffect(() => {
          document.title = "Uangmu | Reset Password";

          checkToken();
     }, [token])

     return (
          <div className="h-screen flex justify-center items-center">
               {success &&
                    <div className="h-screen flex flex-col items-center justify-start">
                         <div className="card flex flex-col items-center space-y-2 p-6">
                              <div className="text-center">
                                   <h2 className="font-semibold">Password berhasil diubah</h2>
                                   <p className="text-gray-500">
                                        Silahkan login dengan password baru kamu
                                   </p>
                                   <Link to="/login">
                                        <Button color="dark" className="w-full my-6">
                                             Login
                                        </Button>
                                   </Link>
                              </div>
                         </div>
                    </div>
               }

               <form onSubmit={handleSubmit(onSubmit)} className={`max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto py-10 ${success ? 'hidden' : 'block'}`}>
                    <h1 className="text-2xl font-bold mb-8">Reset Password <span className="text-sky-500 border-b-2 border-sky-500">Uangmu</span></h1>

                    <div className="mb-2 block">
                         <label htmlFor="password">Password</label>
                    </div>
                    <input id="password" type="password" {...register("password", { required: true, minLength: 8 })} />
                    {errors.password && errors.password.type === "required" && <span className="text-sm text-red-400">Password required</span>}
                    {errors.password && errors.password.type === "minLength" && <span className="text-sm text-red-400">Password min 8 character</span>}

                    <div className="mb-2 block">
                         <label htmlFor="password">Confirm Password</label>
                    </div>
                    <input
                         id="confirmPassword" type="password"
                         {...register("confirmPassword",
                              { required: true, validate: (value) => value === password })}
                    />
                    {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className="text-sm text-red-400">Password required</span>}
                    {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className="text-sm text-red-400">Password not match</span>}
                    <div className="mt-2 block">
                         <button type="submit" className="btn-login" disabled={loading}>{!loading ? "Reset Password" : "Loading..."}
                         </button>
                    </div>
               </form>
          </div>
     );
}