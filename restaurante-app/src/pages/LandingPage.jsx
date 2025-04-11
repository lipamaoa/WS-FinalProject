import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="bg-italian-cream">
     
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src="/images/hero-image.jpg"
            alt="Italian cuisine"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">Ristorante Italiano</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Authentic Italian cuisine made with love and tradition since 1982
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/customer"
              className="bg-italian-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

 
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-serif font-bold text-italian-brown mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-italian-red mb-6"></div>
              <p className="text-gray-700 mb-4">
                Founded in 1982 by the Rossi family, Ristorante Italiano brings the authentic flavors of Italy to your
                table. Our recipes have been passed down through generations, preserving the traditional techniques and
                tastes of Italian cuisine.
              </p>
              <p className="text-gray-700">
                We source only the finest ingredients, including imported Italian products and locally grown organic
                produce, to create dishes that capture the essence of Italy's diverse culinary regions.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/restaurant-1.jpg"
                  alt="Restaurant interior"
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
                <img
                  src="/images/restaurant-2.jpg"
                  alt="Restaurant dishes"
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
                <img
                  src="/images/restaurant-3.jpg"
                  alt="Restaurant chef"
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
                <img
                  src="/images/restaurant-4.jpg"
                  alt="Restaurant ambiance"
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-italian-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-italian-brown mb-4">Featured Menu</h2>
            <div className="w-20 h-1 bg-italian-red mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our chef's selection of signature dishes that showcase the best of Italian cuisine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/pasta.jpg"
                  alt="Pasta dish"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-italian-brown mb-2">Spaghetti Carbonara</h3>
                <p className="text-gray-600 mb-4">
                  Classic Roman pasta with eggs, Pecorino Romano, guanciale, and black pepper
                </p>
                <p className="text-italian-red font-bold">€14.95</p>
              </div>
            </div>

           
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/pizza.jpg"
                  alt="Pizza"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-italian-brown mb-2">Pizza Margherita</h3>
                <p className="text-gray-600 mb-4">
                  Traditional Neapolitan pizza with San Marzano tomatoes, mozzarella, and basil
                </p>
                <p className="text-italian-red font-bold">€12.95</p>
              </div>
            </div>

        
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/tiramisu.jpg"
                  alt="Tiramisu"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://images.unsplash.com/photo-1551529834-525807d6b4f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-italian-brown mb-2">Tiramisu</h3>
                <p className="text-gray-600 mb-4">
                  Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream
                </p>
                <p className="text-italian-red font-bold">€8.95</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/customer"
              className="inline-block bg-italian-brown hover:bg-brown-800 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-italian-brown mb-4">What Our Guests Say</h2>
            <div className="w-20 h-1 bg-italian-red mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="bg-italian-cream p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The best Italian food outside of Italy! The pasta is perfectly cooked, and the flavors transport you
                straight to Rome. Highly recommended!"
              </p>
              <p className="font-bold text-italian-brown">- Maria Johnson</p>
            </div>

         
            <div className="bg-italian-cream p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The ambiance is perfect for a romantic dinner. We loved the wine selection and the staff was incredibly
                knowledgeable and attentive."
              </p>
              <p className="font-bold text-italian-brown">- James Smith</p>
            </div>

          
            <div className="bg-italian-cream p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I've been coming here for years and the quality has never wavered. The tiramisu is absolutely divine -
                don't leave without trying it!"
              </p>
              <p className="font-bold text-italian-brown">- Sophia Garcia</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LandingPage

