import Home from "./pages/Home";
import TakeNotes from "./pages/TakeNotes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

function App() {
  const authPage = window.location.pathname === "/login" || window.location.pathname === "/register";

  return (
    <>
      {!authPage && <Navigation />}
      <div>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/takenotes" element={<TakeNotes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterCard />} />
            <Route path="/login" element={<LoginCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!authPage && <Footer />}
      </div>
    </>
  );
}

export default App;
