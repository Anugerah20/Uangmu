import Home from "./pages/Home";
import TakeNotes from "./pages/TakeNotes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/takenotes" element={<TakeNotes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
