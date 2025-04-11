import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ManagerDashboard from "./pages/ManagerDashboard"
import CustomerDashboard from "./pages/CustomerDashboard"
import KitchenDashboard from "./pages/KitchenDashboard"
import NotFound from "./pages/NotFound"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from "./pages/LandingPage"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
           
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              path="manager"
              element={
                <ProtectedRoute allowedRole="manager">
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="customer"
              element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
           
            <Route
              path="kitchen"
              element={
                <ProtectedRoute allowedRole="kitchen">
                  <KitchenDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

