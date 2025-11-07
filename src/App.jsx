import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import TeacherDashboard from "./components/TeacherDashboard.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/teacher" element={<TeacherDashboard/>} />
        <Route path="/student" element={<StudentDashboard />}/>
      </Routes>
    </Router>
  );
}

//Small helper component to handle login redirection logic
function ProtectedRoute({ element, role }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token) {
      navigate("/"); // not logged in
    } else if (storedRole !== role) {
      navigate("/"); // wrong role trying to access another dashboard
    }
  }, [navigate, role]);

  return element;
}

export default App;
