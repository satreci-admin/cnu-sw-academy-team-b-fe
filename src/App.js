import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobDescriptor from "./pages/JobDescriptor";
import Home from "./pages/Home";
import Robot from "./pages/Robot";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/jobDescriptor/:id" element={<JobDescriptor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
