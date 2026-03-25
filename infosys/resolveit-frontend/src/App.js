import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage"; // New Landing Page
import Login from "./Login";
import Register from "./Register";
import CitizenDashboard from "./CitizenDashboard";
import OfficerDashboard from "./OfficerDashboard";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import DepartmentManagement from "./DepartmentManagement";
import RegisterComplaint from "./RegisterComplaint";
import MyComplaints from "./MyComplaints";
import Feedback from "./Feedback";
import Profile from "./Profile";
import ComplaintOversight from "./ComplaintOversight"; 
import Reports from "./Reports";
import AssignedComplaints from "./AssignedComplaints";

import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Citizen Routes */}
        <Route path="/citizen-dashboard" element={
          <ProtectedRoute role="citizen">
            <CitizenDashboard />
          </ProtectedRoute>
        } />
        <Route path="/register-complaint" element={
          <ProtectedRoute role="citizen">
            <RegisterComplaint />
          </ProtectedRoute>
        } />
        <Route path="/my-complaints" element={
          <ProtectedRoute role="citizen">
            <MyComplaints />
          </ProtectedRoute>
        } />
        <Route path="/feedback" element={
          <ProtectedRoute role="citizen">
            <Feedback />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute role="citizen">
            <Profile />
          </ProtectedRoute>
        } />

        {/* Officer Routes */}
        <Route path="/officer-dashboard" element={
          <ProtectedRoute role="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/assigned-complaints" element={
          <ProtectedRoute role="officer">
            <AssignedComplaints />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user-management" element={
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/department-management" element={
          <ProtectedRoute role="admin">
            <DepartmentManagement />
          </ProtectedRoute>
        } />
        <Route path="/complaints-overview" element={
          <ProtectedRoute role="admin">
            <ComplaintOversight />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute role="admin">
            <Reports />
          </ProtectedRoute>
        } />

        {/* Catch-all: redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;