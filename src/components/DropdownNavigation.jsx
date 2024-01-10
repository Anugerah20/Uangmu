import { Avatar, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { useApiGet, userLogout } from "../services/apiService";
import { Link } from "react-router-dom";
const DropdownNavigation = () => {

     const [userData, setUserData] = useState(null);

     // GET Data User
     useEffect(() => {
          const fetchDataUser = async () => {
               try {
                    const userId = localStorage.getItem("userId");
                    console.log(userId);

                    const token = localStorage.getItem("tokenUser");

                    // console.log("User ID from localStorage: ", userId);
                    console.log("Token User Dropdown: ", token);

                    const response = await useApiGet(`/${userId}`);
                    setUserData(response?.data);

               } catch (error) {
                    console.log("Get Data User Error: ", error);
               }
          }

          fetchDataUser();

     }, []);


     // Generate Avatar Dropdown
     const avatarUserDropdown = () => {
          console.log("avatarUserDropdown: ",);
          return `https://ui-avatars.com/api/?name=${userData?.fullname}&background=random&length=1&rounded=true`;
     }

     return (
          <div className="flex lg:ml-0 md:ml-0 ml-1">
               <Dropdown
                    arrowIcon={true}
                    inline
                    className="mt-2 shadow-sm"
                    label={
                         <Avatar alt="User settings" img={avatarUserDropdown()} rounded />
                    }
               >
                    <Dropdown.Header>
                         <div className="bg-red-200 text-red-500 p-3 font-normal rounded-md">Profil kamu belum lengkap</div>
                         <div className="flex items-center my-2 space-x-2">
                              <img src={avatarUserDropdown()}
                                   alt="Profile User" className="mt-2 w-10 h-10 rounded-full"
                              />
                              <span className="text-sm text-primary mt-3 ml-2">
                                   <p className="py-1 text-primary">Hai, <span className="font-bold">
                                        {userData?.fullname || 'User'}
                                   </span></p>
                                   <small className="text-gray-600">Bergabung 3 Des 2024</small>
                              </span>
                         </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                         <span className="text-sm py-1 text-gray-600 hover:bg-gray-50 flex items-center w-full text-left">
                              <FaUserEdit className='mr-2' />
                              <Link to={`/edit-profil/${userData?.id}`}>Edit Profil</Link>
                         </span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <span className="text-sm py-1 text-gray-600 hover:bg-gray-50 flex items-center w-full text-left" onClick={userLogout}>
                              <FaSignOutAlt className='mr-2' />
                              Keluar
                         </span>
                    </Dropdown.Item>
               </Dropdown>
          </div>
     )
}

export default DropdownNavigation