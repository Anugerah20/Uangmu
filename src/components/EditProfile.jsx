import { useState, useEffect, useRef } from "react";
import { userApiEditGet, userApiEditData } from "../services/apiService";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { Toaster, toast } from "sonner";
import { Spinner } from "flowbite-react";

const EditProfile = () => {

     const [getEditData, setGetEditData] = useState({});
     const [file, setFile] = useState();
     const [updateImage, setUpdateImage] = useState("");
     const [loadingEditProfile, setLoadingEditProfile] = useState(false);
     const fileInputRef = useRef(null);

     // Get Data User
     useEffect(() => {
          const editProfileUser = async () => {
               try {
                    const userId = localStorage.getItem("userId");
                    // const token = localStorage.getItem("tokenUser");

                    const response = await userApiEditGet(`/edit-profil/${userId}`);
                    setGetEditData(response?.data);

                    // Set URL avatar dari Cloudinary saat mengambil data pengguna
                    setUpdateImage(response?.data?.image);

               } catch (error) {
                    console.log("Get Data Edit Profile Error: ", error);
               }
          }

          editProfileUser();

     }, []);

     // Show get data user by id
     const handleChange = (e) => {
          setGetEditData((prevData) => ({
               ...prevData,
               [e.target.name]: e.target.value,
          }));
     };

     // Get image user
     const handleImage = (e) => {
          const file = e.target.files[0];
          setFile(file);

          // check if file is not empty
          if (file) {
               const imageUrl = URL.createObjectURL(file);
               setUpdateImage(imageUrl);
          }
     }

     // Update Profile User
     const handleSubmit = async (e) => {
          e.preventDefault();

          // Active process loading
          setLoadingEditProfile(true);

          const data = new FormData();
          data.append("fullname", getEditData.fullname);
          data.append("bio", getEditData.bio);
          // check file is not empty
          if (file) data.append("file", file);

          try {
               const userId = localStorage.getItem("userId");
               const response = await userApiEditData(`/edit-profil/${userId}`, data);

               if (response.status === 200) {
                    toast.success("Edit Profil Successfully");

                    // update state directly without reload
                    setGetEditData((prevData) => ({
                         ...prevData,
                         fullname: getEditData.fullname,
                         bio: getEditData.bio,
                    }));

                    // Set URL avatar dari Cloudinary saat mengambil data pengguna
                    if (getEditData.image) {
                         setUpdateImage(getEditData.image);
                    }

                    // Reset file input image
                    if (fileInputRef.current) {
                         fileInputRef.current.value = "";
                    }

               } else if (response.status === 400) {
                    toast.error("Edit Profil Failed");
               }

               console.log("Edit Profile User: ", response);

          } catch (error) {
               console.log("Update Data Edit Profile Error: ", error)
          } finally {
               setLoadingEditProfile(false);
          }
     }

     // Get Edit Data Image Avatar User
     const getEditAvatarUser = () => {
          return updateImage || `https://ui-avatars.com/api/?name=${getEditData?.fullname}&background=random&length=1&rounded=true`;
     }

     return (
          <div>
               <form encType="multipart/form-data" onSubmit={handleSubmit} className="max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto my-10">
                    <Toaster />
                    <div className="flex justify-between mb-6 border-b-2 border-gray-300 py-2">
                         <div className="flex justify-center items-center gap-3">
                              <FaRegUser className="w-5 h-5 !font-bold" />
                              <p className="text-md">Edit Profil</p>
                         </div>
                         <div className="flex justify-center items-center gap-3">
                              <IoMdArrowBack className="w-5 h-5" />
                              <Link to="/" className="text-md">Ke Beranda</Link>
                         </div>
                    </div>

                    <div className="mb-2 block">
                         <label htmlFor="gambar">Gambar</label>
                         <img src={getEditAvatarUser()}
                              alt="Profile User" className="mt-2 w-20 h-20 border-2 border-gray-300 rounded-full"
                              id="gambar"
                         />
                         <input className="mt-2" type="file" name="file" id="file"
                              onChange={handleImage}
                              ref={fileInputRef}
                         />

                    </div>
                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="fullname">Nama Lengkap</label>
                         </div>
                         <input
                              id="fullname" type="text"
                              name="fullname" value={getEditData?.fullname || ""}
                              onChange={handleChange}
                         />
                    </div>

                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="email">Email</label>
                         </div>
                         <input
                              id="email" type="email" className="cursor-not-allowed bg-gray-200"
                              name="email" value={getEditData?.email || ""} disabled
                              onChange={handleChange}
                         />
                    </div>

                    <div>
                         <div className="mb-2 block">
                              <label htmlFor="bio">Bio</label>
                         </div>
                         <textarea
                              id="bio" type="email"
                              className="rounded h-20"
                              name="bio" value={getEditData?.bio || ""}
                              onChange={handleChange}
                         ></textarea>
                    </div>

                    <div>
                         <button type="submit" className="btn-login" disabled={loadingEditProfile}>
                              {loadingEditProfile ? (
                                   <div className="flex justify-center items-center gap-x-3">
                                        <Spinner size="md" />
                                        Menyimpan data
                                   </div>
                              ) : (
                                   "Simpan profil saya"
                              )}
                         </button>
                    </div>
               </form >
          </div >
     )
}

export default EditProfile;
