import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const foodImages = {
  starter: ["/images/food/bruschetta.jpg", "/images/food/caesar-salad.jpg", "/images/food/calamari.jpg"],
  main: ["/images/food/pasta.jpg", "/images/food/funghi.jpg", "/images/food/risotto.jpg", "/images/food/steak.jpg"],
  dessert: ["/images/food/tiramisu.jpg", "/images/food/panna-cotta.jpg", "/images/food/cannoli.jpg"],
}


const fallbackImages = {
  starter: "https://images.unsplash.com/photo-1546241072-48010ad2862c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  main: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
}

const CustomerDashboard = () => {
  const [menuItems, setMenuItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/menu")
      if (!response.ok) {
        throw new Error("Error fetching menu items")
      }
      const data = await response.json()

   
      const itemsWithImages = data.map((item, index) => {
        const typeImages = foodImages[item.type] || []
        const imageIndex = index % typeImages.length
        return {
          ...item,
          imageUrl: typeImages[imageIndex] || fallbackImages[item.type] || fallbackImages.main,
        }
      })

      setMenuItems(itemsWithImages)
      setLoading(false)
    } catch (error) {
      setError("Error loading the menu: " + error.message)
      setLoading(false)
    }
  }

  const handleItemSelect = (item) => {
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id)

    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const handleQuantityChange = (itemId, change) => {
    const updatedItems = [...selectedItems]
    const itemIndex = updatedItems.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) return

    if (!updatedItems[itemIndex].quantity) {
      updatedItems[itemIndex].quantity = 1
    }

    const newQuantity = (updatedItems[itemIndex].quantity || 1) + change

    if (newQuantity <= 0) {
      updatedItems.splice(itemIndex, 1)
    } else {
      updatedItems[itemIndex].quantity = newQuantity
    }

    setSelectedItems(updatedItems)
  }

  const getItemQuantity = (itemId) => {
    const item = selectedItems.find((item) => item.id === itemId)
    return item ? item.quantity || 1 : 0
  }

  const handlePlaceOrder = async () => {
    if (selectedItems.length === 0) {
      setError("Please select at least one item to place an order")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          items: selectedItems,
          status: "pending",
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Error placing the order")
      }

      setSelectedItems([])
      setOrderSuccess(true)
      setTimeout(() => setOrderSuccess(false), 3000)
    } catch (error) {
      setError("Error placing the order: " + error.message)
    }
  }

  

  const calculateTotal = () => {
    return selectedItems
      .reduce((sum, item) => {
        const quantity = item.quantity || 1
        return sum + item.price * quantity
      }, 0)
      .toFixed(2)
  }

  const filterMenuItems = (items) => {
    if (activeCategory === "all") return items
    return items.filter((item) => item.type === activeCategory)
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-italian-brown text-white">
              <h2 className="text-3xl font-serif font-bold">Our Menu</h2>
              <p className="text-gray-200 mt-2">Select your favorite dishes from our authentic Italian menu</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {orderSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 m-4">
                <p className="text-green-700">
                  Order placed successfully! Your delicious food will be prepared shortly.
                </p>
              </div>
            )}

            <div className="flex overflow-x-auto border-b border-gray-200 bg-italian-red text-white w-full">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeCategory === "all" ? "bg-red-700" : "hover:bg-red-700"}`}
              >
                All Items
              </button>
              <button
                onClick={() => setActiveCategory("starter")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeCategory === "starter" ? "bg-red-700" : "hover:bg-red-700"}`}
              >
                Starters
              </button>
              <button
                onClick={() => setActiveCategory("main")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeCategory === "main" ? "bg-red-700" : "hover:bg-red-700"}`}
              >
                Main Courses
              </button>
              <button
                onClick={() => setActiveCategory("dessert")}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeCategory === "dessert" ? "bg-red-700" : "hover:bg-red-700"}`}
              >
                Desserts
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterMenuItems(menuItems).map((item) => {
                  const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id)
                  const quantity = getItemQuantity(item.id)

                  return (
                    <div
                      key={item.id}
                      className={`border rounded-lg overflow-hidden transition-all ${isSelected ? "border-italian-green bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = fallbackImages[item.type] || fallbackImages.main
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-serif font-bold text-italian-brown">{item.name}</h3>
                          <span className="text-italian-red font-bold">€{item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 h-12 overflow-hidden">{item.description}</p>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {item.type === "starter" ? "Starter" : item.type === "main" ? "Main Course" : "Dessert"}
                          </span>

                          {isSelected ? (
                            <div className="flex items-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuantityChange(item.id, -1)
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="mx-2 font-medium">{quantity}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuantityChange(item.id, 1)
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-italian-green text-white hover:bg-green-700"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleItemSelect(item)}
                              className="px-3 py-1 bg-italian-red text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                            >
                              Add to Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg sticky top-4">
            <div className="p-6 bg-italian-brown text-white">
              <h3 className="text-2xl font-serif font-bold">Your Order</h3>
              <p className="text-gray-200 mt-2">Review your selected items</p>
            </div>

            <div className="p-6">
              {selectedItems.length === 0 ? (
                <div className="text-center py-8">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 italic">Your order is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add some delicious items from our menu</p>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200 mb-6">
                    {selectedItems.map((item) => {
                      const quantity = item.quantity || 1
                      const itemTotal = (item.price * quantity).toFixed(2)

                      return (
                        <li key={item.id} className="py-4 flex justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                              <img
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = fallbackImages[item.type] || fallbackImages.main
                                }}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                {quantity} x €{item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">€{itemTotal}</span>
                            <button
                              onClick={() => setSelectedItems(selectedItems.filter((i) => i.id !== item.id))}
                              className="ml-2 text-gray-400 hover:text-red-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">€{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">€0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-italian-red">€{calculateTotal()}</span>
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full bg-italian-green hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    onClick={handlePlaceOrder}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Place Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard

