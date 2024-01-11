import Home from "./pages/Home";
import TakeNotes from "./pages/TakeNotes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation/Navigation";
import LoginCard from "./pages/LoginUser/LoginCard";
import RegisterCard from "./pages/RegisterUser/RegisterCard";
import PrivateRoute from "./utils/PrivateRoute";
import EditProfile from "./components/EditProfile";

function App() {

  // Hidden Navigation & Footer
  const location = useLocation();

  const hiddenPage = /^\/(login|register)($|\/)/.test(location.pathname);

  // Check Authenticated 
  const isAuthenticated = () => {
    const tokenUser = localStorage.getItem("tokenUser");
    return !!tokenUser;
  }

  return (
    <>
      {!hiddenPage && <Navigation />}
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/takenotes"
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path="/takenotes"
                element={TakeNotes}
              />
            }
          />
          <Route
            path="/edit-profil/:id"
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path="/edit-profil/:id"
                element={EditProfile}
              />
            }
          />
          <Route
            path="/contact"
            element={<PrivateRoute
              authenticated={isAuthenticated()}
              path="/contact"
              element={Contact}
            />
            }
          />
          <Route path="/register" element={<RegisterCard />} />
          <Route
            path="/login"
            element={<LoginCard />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hiddenPage && <Footer />}
    </>
  );
}

export default App;
