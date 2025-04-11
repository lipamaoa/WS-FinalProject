import { useState, useEffect } from "react"

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    fetchOrders()

    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3001/orders")
      if (!response.ok) {
        throw new Error("Error fetching orders")
      }
      const data = await response.json()

      const sortedOrders = data.sort((a, b) => {
        const statusOrder = { pending: 0, "in preparation": 1, delivered: 2 }
        return statusOrder[a.status] - statusOrder[b.status]
      })
      setOrders(sortedOrders)
      setLoading(false)
    } catch (error) {
      setError("Error loading orders: " + error.message)
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error("Error updating order status")
      }

      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

      setSuccessMessage(`Order #${orderId} has been updated to ${newStatus}`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setError("Error updating order status: " + error.message)
    }
  }

  const getFilteredOrders = () => {
    if (activeFilter === "all") return orders
    return orders.filter((order) => order.status === activeFilter)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-500"
      case "in preparation":
        return "bg-blue-100 text-blue-800 border-blue-500"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-500"
      default:
        return "bg-gray-100 text-gray-800 border-gray-500"
    }
  }

  const getStatusBorderColor = (status) => {
    switch (status) {
      case "pending":
        return "border-l-4 border-yellow-500"
      case "in preparation":
        return "border-l-4 border-blue-500"
      case "delivered":
        return "border-l-4 border-green-500"
      default:
        return ""
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No date"

    try {
      const date = new Date(dateString)

      if (isNaN(date.getTime())) {
        return "Invalid date"
      }

      return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (error) {
      console.error("Date formatting error:", error)
      return "Invalid date"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-italian-red"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-italian-brown">Kitchen Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>

        <button
          onClick={fetchOrders}
          className="mt-4 md:mt-0 bg-italian-brown hover:bg-brown-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-italian-brown text-white">
          <h3 className="text-2xl font-serif font-bold">Orders</h3>
          <p className="text-gray-200 mt-2">View and manage customer orders</p>
        </div>

   
        <div className="flex overflow-x-auto border-b border-gray-200 bg-italian-red text-white">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeFilter === "all" ? "bg-red-700" : "hover:bg-red-700"}`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeFilter === "pending" ? "bg-red-700" : "hover:bg-red-700"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveFilter("in preparation")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeFilter === "in preparation" ? "bg-red-700" : "hover:bg-red-700"}`}
          >
            In Preparation
          </button>
          <button
            onClick={() => setActiveFilter("delivered")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeFilter === "delivered" ? "bg-red-700" : "hover:bg-red-700"}`}
          >
            Delivered
          </button>
        </div>

        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 italic">No orders at the moment</p>
              <p className="text-gray-500 text-sm mt-2">New orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredOrders().map((order) => (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg shadow border ${getStatusBorderColor(order.status)} overflow-hidden transition-all hover:shadow-md`}
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-italian-brown">Order #{order.id}</h4>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium">Customer: {order.userName || "Unknown"}</p>
                  </div>

                  <div className="p-4 bg-gray-50">
                    <h5 className="font-medium text-italian-brown mb-2">Items:</h5>
                    <ul className="space-y-1">
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <li key={index} className="text-gray-700 text-sm flex justify-between">
                            <span>{item.name}</span>
                            {item.quantity && <span className="text-gray-500">x{item.quantity}</span>}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">No items in this order</li>
                      )}
                    </ul>
                  </div>

                  <div className="p-4 bg-white border-t border-gray-100">
                    {order.status === "pending" && (
                      <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        onClick={() => updateOrderStatus(order.id, "in preparation")}
                      >
                        Start Preparation
                      </button>
                    )}
                    {order.status === "in preparation" && (
                      <button
                        className="w-full bg-italian-green hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {order.status === "delivered" && (
                      <div className="text-center text-green-600 font-medium">✓ Order Completed</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default KitchenDashboard

