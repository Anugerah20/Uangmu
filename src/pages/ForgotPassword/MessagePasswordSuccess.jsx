import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function MessagePasswordSuccess() {
     return (
          <div className="h-screen flex flex-col items-center justify-center">
               <div className="card flex flex-col items-center space-y-2 p-6">
                    <div className="text-center">
                         <h1 className="font-semibold text-2xl">Password berhasil diubah</h1>
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
     );
}
