import Home from "./page/Home";
import TakeNotes from "./page/TakeNotes";
import Contact from "./page/Contact";
import NotFound from "./page/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/takenotes" element={<TakeNotes/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/takenotes" element={<TakeNotes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
