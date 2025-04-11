import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/users")
        .then((response) => response.json())
        .then((users) => {
          const user = users.find(
            (u) => u.email === userData.email && u.password === userData.password
          )

          if (user) {
            setCurrentUser(user)
            localStorage.setItem("currentUser", JSON.stringify(user))
            resolve(user)
          } else {
            reject(new Error("Invalid credentials"))
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register user")
          }
          return response.json()
        })
        .then((newUser) => {
          resolve(newUser)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
