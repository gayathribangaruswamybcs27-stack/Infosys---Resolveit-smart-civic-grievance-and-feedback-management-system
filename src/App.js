import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CitizenDashboard from "./CitizenDashboard";
import OfficerDashboard from "./OfficerDashboard";
import AdminDashboard from "./AdminDashboard";
import RegisterComplaint from "./RegisterComplaint";


function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/citizen-dashboard" element={
          <ProtectedRoute role="citizen">
            <CitizenDashboard />
          </ProtectedRoute>
        } />

        <Route path="/officer-dashboard" element={
          <ProtectedRoute role="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/register-complaint" element={
  <ProtectedRoute role="citizen">
    <RegisterComplaint />
  </ProtectedRoute>
} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;