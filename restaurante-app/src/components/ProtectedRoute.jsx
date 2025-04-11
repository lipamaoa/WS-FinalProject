import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
