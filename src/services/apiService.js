import axios from "axios";

// Make api
const urlDev = "http://localhost:3000/user";
const token = localStorage.getItem("tokenUser");
console.log("LIHAT TOKEN: ", token);

const apiService = axios.create({
     baseURL: urlDev,
     headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
     }
});

// Interceptor buat menyesuaikan setiap ada permintaan
// Mempengaruhi edit profil, harus dimodifikasi
apiService.interceptors.request.use(
     (config) => {
          // Ambil token dari local storage
          const token = localStorage.getItem("tokenUser");

          // Jika token tersedia, tambahkan header Authorization
          if (token) {
               config.headers["Authorization"] = `Bearer ${token}`;
          }

          return config;
     },
     (error) => {
          return Promise.reject("Token Interceptor Failed: ", error);
     }
);


// Register User
export const userApiPost = async (url, userData) => {
     try {
          const response = await apiService.post(url, userData);
          return response;
     } catch (error) {
          console.error("Register Failed", error);
          throw error;
     }
}

// Show Data User
export const useApiGet = async (url) => {
     try {
          const response = await apiService.get(url);
          return response;

     } catch (error) {
          console.log("Get Data User Error: ", error);
     }
}

// Get edit data user by id
export const userApiEditGet = async (url) => {
     try {
          const response = await apiService.get(url);
          console.log("USE GET DATA EDIT USER: ", response);
          return response;

     } catch (error) {
          console.log("Get Edit Data: ", error);
     }
}

// Edit Data Profile User By Id
export const userApiEditData = async (url, userData) => {
     try {
          const response = await apiService.put(url, userData);
          console.log("USE PUT DATA USER: ", response);
          return response;

     } catch (error) {
          console.log("Put Edit Data User: ", error);
     }
}

// Logout User
export const userLogout = () => {
     try {
          localStorage.removeItem("tokenUser");
          localStorage.removeItem("userId");
          window.location.replace("/login");

     } catch (error) {
          console.log("Error Logout User: ", error);
     }
} 
