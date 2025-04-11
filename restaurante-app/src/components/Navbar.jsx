"use client"

import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()


  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              
              <div className="h-10 w-10 flex items-center justify-center bg-italian-brown text-white rounded-md">
                <span className="font-serif font-bold">RI</span>
              </div>
              <span className="ml-3 text-xl font-serif font-bold text-italian-brown">Ristorante Italiano</span>
            </Link>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {currentUser.role === "manager" && (
                  <Link
                    to="/manager"
                    className="px-3 py-2 rounded-md text-sm font-medium text-italian-brown hover:bg-gray-100"
                  >
                    Manager Panel
                  </Link>
                )}
                {currentUser.role === "customer" && (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/customer"
                      className="px-3 py-2 rounded-md text-sm font-medium text-italian-brown hover:bg-gray-100"
                    >
                      Menu
                    </Link>
                   
                  </div>
                )}
                {currentUser.role === "kitchen" && (
                  <Link
                    to="/kitchen"
                    className="px-3 py-2 rounded-md text-sm font-medium text-italian-brown hover:bg-gray-100"
                  >
                    Kitchen
                  </Link>
                )}
                <span className="text-sm text-gray-600">Hello, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 bg-italian-red text-white text-sm rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-italian-brown hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-italian-red text-white text-sm rounded-md hover:bg-red-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

