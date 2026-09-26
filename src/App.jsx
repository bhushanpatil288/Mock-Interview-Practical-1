import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { MainLayout } from "./layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import Tickets from "./pages/Tickets";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./auth/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const GuestRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Stats />} />
                <Route path="create-ticket" element={<CreateTicket />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="open-tickets" element={<Tickets statusFilter="Open" />} />
                <Route path="in-progress-tickets" element={<Tickets statusFilter="In progress" />} />
                <Route path="resolved-tickets" element={<Tickets statusFilter="Resolved" />} />
                <Route path="closed-tickets" element={<Tickets statusFilter="Closed" />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App