import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found py-16 text-center">
      <h2 className="text-3xl font-serif font-bold text-italian-brown mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-italian-red hover:underline">
        Go back to the homepage
      </Link>
    </div>
  )
}

export default NotFound

