import { useState, useEffect } from "react"

const ManagerDashboard = () => {
  const [menuItems, setMenuItems] = useState([])
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    type: "starter",
    imageUrl: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [successMessage, setSuccessMessage] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

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
      setMenuItems(data)
      setLoading(false)
    } catch (error) {
      setError("Error loading the menu")
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    
    if (!file.type.match("image.*")) {
      setError("Please select an image file")
      return
    }

   
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB")
      return
    }

    setImageFile(file)


    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imageUrlToSave = newItem.imageUrl

      
      if (imageFile) {
        setUploadingImage(true)
        try {
          const base64Image = await convertImageToBase64(imageFile)
          imageUrlToSave = base64Image
        } catch (error) {
          setError("Error processing image: " + error.message)
          setUploadingImage(false)
          return
        }
        setUploadingImage(false)
      }

      if (isEditing) {
       
        const response = await fetch(`http://localhost:3001/menu/${editingItemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newItem,
            price: Number.parseFloat(newItem.price),
            imageUrl: imageUrlToSave,
            id: editingItemId, 
          }),
        })

        if (!response.ok) {
          throw new Error("Error updating menu item")
        }

        const updatedItem = await response.json()

     
        setMenuItems(menuItems.map((item) => (item.id === editingItemId ? updatedItem : item)))

        setSuccessMessage(`"${updatedItem.name}" has been updated`)
      } else {
        
        const response = await fetch("http://localhost:3001/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newItem,
            price: Number.parseFloat(newItem.price),
            imageUrl: imageUrlToSave,
          }),
        })

        if (!response.ok) {
          throw new Error("Error adding item to menu")
        }

        const addedItem = await response.json()
        setMenuItems([...menuItems, addedItem])

     
        setSuccessMessage(`"${addedItem.name}" has been added to the menu`)
      }

   
      resetForm()
    } catch (error) {
      setError(`Error ${isEditing ? "updating" : "adding"} item to menu: ${error.message}`)
    }
  }

  const handleDelete = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:3001/menu/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error deleting item from menu")
      }

      setMenuItems(menuItems.filter((item) => item.id !== id))

     
      if (editingItemId === id) {
        resetForm()
      }

      setSuccessMessage(`"${name}" has been removed from the menu`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setError("Error deleting item from menu")
    }
  }

  const handleEdit = (item) => {
  
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      type: item.type,
      imageUrl: item.imageUrl || "",
    })

  
    if (item.imageUrl) {
      setImagePreview(item.imageUrl)
    } else {
      setImagePreview(null)
    }

 
    setEditingItemId(item.id)
    setIsEditing(true)

 
    document.querySelector(".menu-form-container")?.scrollIntoView({ behavior: "smooth" })
  }

  const resetForm = () => {
  
    setNewItem({
      name: "",
      description: "",
      price: "",
      type: "starter",
      imageUrl: "",
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingItemId(null)
    setIsEditing(false)

   
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const cancelEdit = () => {
    resetForm()
  }

  const filterMenuItems = (items) => {
    if (activeCategory === "all") return items
    return items.filter((item) => item.type === activeCategory)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setNewItem({
      ...newItem,
      imageUrl: "",
    })
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
      <h2 className="text-3xl font-serif font-bold text-italian-brown mb-6">Manager Dashboard</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError("")} className="text-red-700 font-medium hover:underline mt-1">
            Dismiss
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
        <div className="bg-white rounded-lg shadow-lg overflow-hidden menu-form-container">
          <div className="p-6 bg-italian-brown text-white">
            <h3 className="text-2xl font-serif font-bold">{isEditing ? "Edit Menu Item" : "Add New Menu Item"}</h3>
            <p className="text-gray-200 mt-2">
              {isEditing ? "Update the details of this dish" : "Create a new dish for your restaurant menu"}
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-italian-red focus:border-italian-red"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-italian-red focus:border-italian-red"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (€):
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={newItem.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-italian-red focus:border-italian-red"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newItem.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-italian-red focus:border-italian-red"
                    required
                  >
                    <option value="starter">Starter</option>
                    <option value="main">Main Course</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Dish Image:
                </label>

                {imagePreview ? (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full max-h-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-italian-red hover:text-red-700 focus-within:outline-none"
                        >
                          <span>Upload an image</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                    </div>
                  </div>
                )}

                {/* Optional URL input for external images */}
                <div className="mt-3">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Or enter image URL:
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={newItem.imageUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-italian-red focus:border-italian-red"
                    placeholder="https://example.com/image.jpg"
                    disabled={!!imageFile}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className={`${isEditing ? "flex-1" : "w-full"} bg-italian-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50`}
                >
                  {uploadingImage ? "Processing..." : isEditing ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Current Menu */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-italian-brown text-white">
            <h3 className="text-2xl font-serif font-bold">Current Menu</h3>
            <p className="text-gray-200 mt-2">Manage your restaurant's offerings</p>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-italian-red text-white">
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

          <div className="p-6 max-h-[500px] overflow-y-auto">
            {filterMenuItems(menuItems).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 italic">No items in this category</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filterMenuItems(menuItems).map((item) => (
                  <li
                    key={item.id}
                    className={`py-4 flex justify-between items-start hover:bg-gray-50 ${editingItemId === item.id ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex">
                      {item.imageUrl && (
                        <div className="mr-4">
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = "/placeholder.svg?height=80&width=80"
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-italian-brown">{item.name}</h4>
                          <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {item.type === "starter" ? "Starter" : item.type === "main" ? "Main Course" : "Dessert"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <p className="text-italian-red font-medium mt-1">€{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-md transition-colors"
                        onClick={() => handleDelete(item.id, item.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard

