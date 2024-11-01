import axios from "axios";

// Make api
// const urlApi = "http://localhost:3000/user";
const dev = "https://uangmu.railway.mu.app/";
const token = localStorage.getItem("tokenUser");

const apiService = axios.create({
     baseURL: dev,
     // baseURL: urlApi,
     headers: {
          "Authorization": `Bearer ${token}`
     }
});

// Register & login user
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
          return response;

     } catch (error) {
          console.log("Get Edit Data: ", error);
     }
}

// Edit Data Profile User By Id
export const userApiEditData = async (url, userData) => {
     try {
          const response = await apiService.put(url, userData);
          return response;

     } catch (error) {
          console.log("Put Edit Data User: ", error);
     }
}

// Delete note user by id
export const userApiDelete = async (url) => {
     try {
          const response = await apiService.delete(url);
          return response.data;

     } catch (error) {
          console.log("Delete Data User: ", error);
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
