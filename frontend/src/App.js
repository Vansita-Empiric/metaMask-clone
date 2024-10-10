import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./App.css";

import Welcome from "./components/Welcome";
import CreatePassword from "./components/CreatePassword";
import ReviewRecoveryPhase from "./components/ReviewRecoveryPhase";
import Completion from "./components/Completion";
import Home from "./components/Home";

function App() {
  return (
    <div
      style={{
        minWidth: "400px",
        width: "auto", 
        minHeight: "fit-content",
        height: "auto",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route
            path="/review-recovery-phase"
            element={<ReviewRecoveryPhase />}
          />
          <Route path="/completion" element={<Completion />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
