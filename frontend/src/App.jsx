import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import SignupNGO from "./pages/signup-NGO.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<SignupNGO />} />
      </Routes>
    </Router>
  );
}

export default App;
