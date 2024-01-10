import { useState, useEffect } from "react";
import { userApiEditGet, userApiEditData } from "../services/apiService";
import { Link } from "react-router-dom";

const EditProfile = () => {

     // const [getEditData, setGetEditData] = useState([]);
     const [getEditData, setGetEditData] = useState({});
     const [file, setFile] = useState()

     // Get Data User
     useEffect(() => {
          const editProfileUser = async () => {
               try {
                    const userId = localStorage.getItem("userId");
                    const token = localStorage.getItem('tokenUser');

                    console.log("GET Edit Profile ID from localStorage: ", userId);
                    console.log("GET Edit Profile Token User: ", token);

                    const response = await userApiEditGet(`/edit-profil/${userId}`);
                    setGetEditData(response?.data);

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

     const handleImage = (e) => {
          setFile(
               e.target.files[0],
          );
     }

     const handleSubmit = async (e) => {
          e.preventDefault();

          const data = new FormData();
          data.append("fullname", getEditData.fullname);
          data.append("bio", getEditData.bio);
          data.append("file", file);

          try {
               const userId = localStorage.getItem("userId");
               const res = await userApiEditData(`/edit-profil/${userId}`, data);
               console.log(res);

          } catch (error) {
               console.log("Update Data Edit Profile Error: ", error)
          }
     }

     // Get Edit Data Image Avatar User
     const getEditAvatarUser = () => {
          return `https://ui-avatars.com/api/?name=${getEditData?.fullname}&background=random&length=1&rounded=true`;
     }

     return (
          <div>
               <form encType="multipart/form-data" onSubmit={handleSubmit} className="max-w-md lg:w-full md:w-4/5 w-4/5 flex-col gap-4 mx-auto py-10">
                    <h1 className="text-2xl font-bold mb-8">EDIT PROFIL | <span className="text-sky-500 border-b-2 border-sky-500">UANGMU</span></h1>

                    <div className="mb-2 block">
                         <label htmlFor="gambar">Gambar</label>
                         <img src={getEditAvatarUser()}
                              alt="Profile User" className="mt-2 w-20 h-20 rounded-full"
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
                              name="bio" value={getEditData?.bio || ""}
                              onChange={handleChange}
                         ></textarea>
                    </div>

                    <button type="submit" className="btn-login mt-4">Simpan profil saya</button>

                    <div className="mt-4 text-center underline">
                         <Link to="/takenotes">Kembali ke beranda</Link>
                    </div>
               </form>
          </div>
     )
}

export default EditProfile;