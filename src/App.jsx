import Home from "./pages/Home";
import TakeNotes from "./pages/TakeNotes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation/Navigation";
import LoginCard from "./pages/LoginUser/LoginCard";
import RegisterCard from "./pages/RegisterUser/RegisterCard";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import EditProfile from "./components/EditProfile";
import EditModalNote from "./components/EditModalNote";

import { Route, Routes, useLocation } from "react-router-dom";
import { UserLogin, ProtechUser } from "./utils/PrivateRoute";
import { Toaster } from "sonner";

function App() {

  // Hidden Navigation & Footer
  const location = useLocation();

  // Perintah ini berfungsi untuk mengabaikan navigasi dan footer
  const hiddenPage = /^\/(login|register|forgot-password|reset-password)($|\/)/.test(location.pathname);

  return (
    <>
      <Toaster />
      {!hiddenPage && <Navigation />}
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Private route hanya bisa diakses ketika sudah melakukan login */}
          <Route element={<ProtechUser />}>
            <Route path="/takenotes" element={<TakeNotes />} />
            <Route path="/edit-profil/:id" element={<EditProfile />} />
            <Route path="/edit-catatan/:id" element={<EditModalNote />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* ketika sudah login maka tidak bisa akses ke route login dan register sebelum logout */}
          <Route element={<UserLogin />}>
            <Route path="/register" element={<RegisterCard />} />
            <Route path="/login" element={<LoginCard />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hiddenPage && <Footer />}
    </>
  );
}

export default App;
