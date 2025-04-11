import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const user = await login(formData)

   
      if (user.role === "manager") {
        navigate("/manager")
      } else if (user.role === "customer") {
        navigate("/customer")
      } else if (user.role === "kitchen") {
        navigate("/kitchen")
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <h2 className="text-2xl font-serif font-bold text-italian-brown text-center mb-6">Login</h2>
      {error && <p className="error bg-red-50 p-3 rounded-md">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="w-full bg-italian-red hover:bg-red-700 text-white py-2 rounded-md">
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login

