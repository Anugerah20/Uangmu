import { useState, useEffect } from "react";
import { userApiEditGet, userApiEditData } from "../services/apiService";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { Toaster, toast } from "sonner";

const EditProfile = () => {

     const [getEditData, setGetEditData] = useState({});
     const [file, setFile] = useState();
     const [updateImage, setUpdateImage] = useState("");
     const [loadingEditProfile, setLoadingEditProfile] = useState(false);

     // Get Data User
     useEffect(() => {
          const editProfileUser = async () => {
               try {
                    const userId = localStorage.getItem("userId");
                    const token = localStorage.getItem("tokenUser");

                    console.log("GET Edit Profile ID from localStorage: ", userId);
                    console.log("GET Edit Profile Token User: ", token);

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
          setFile(e.target.files[0]);
     }

     // Update Profile User
     const handleSubmit = async (e) => {
          e.preventDefault();

          // Active process loading
          setLoadingEditProfile(true);

          const data = new FormData();
          data.append("fullname", getEditData.fullname);
          data.append("bio", getEditData.bio);
          data.append("file", file);

          try {
               const userId = localStorage.getItem("userId");
               const response = await userApiEditData(`/edit-profil/${userId}`, data);

               if (response.status === 200) {
                    toast.success("Edit Profil Successfully");
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
                    <div className="flex justify-between mb-6">
                         <div className="flex justify-center items-center gap-2">
                              <FaRegUser className="w-5 h-5" />
                              <h1 className="text-2xl font-bold">Edit Profil</h1>
                         </div>
                         <div className="flex justify-center items-center gap-3">
                              <FaArrowLeft className="w-5 h-5" />
                              <Link to="/">Ke Beranda</Link>
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
                              {loadingEditProfile ? "Menyimpan Data" : "Simpan profil saya"}
                         </button>
                    </div>
               </form >
          </div >
     )
}

export default EditProfile;