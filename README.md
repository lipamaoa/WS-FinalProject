# Ristorante Italiano - Restaurant Management System

![Ristorante Italiano Logo](public/images/italian-restaurant-logo.png)

A comprehensive restaurant management system for Ristorante Italiano, an authentic Italian restaurant. This web application allows customers to browse the menu and place orders, kitchen staff to manage food preparation, and managers to update the menu and oversee operations.

## Features

- **User Authentication**: Secure login and registration with role-based access control
- **Role-Based Access**: Different interfaces for consumers, kitchen staff, and managers
- **Menu Management**: Managers can add, edit, and remove menu items
- **Order System**: Customers can browse the menu, add items to cart, and place orders
- **Order Tracking**: Kitchen staff can view and update order status
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**:
  - React.js
  - React Router for navigation
  - Tailwind CSS for styling
  - Context API for state management

- **Backend**:
  - JSON Server (for development)
  - RESTful API architecture

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/restaurant-management.git
   cd restaurant-management
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the JSON Server (mock backend):
   \`\`\`bash
   npx json-server --watch server/db.json --port 3001
   \`\`\`

4. In a new terminal, start the React development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Default User Accounts

The system comes with three pre-configured user accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Manager | manager@restaurant.com | 123456 |
| Consumer | consumer@restaurant.com | 123456 |
| Kitchen | kitchen@restaurant.com | 123456 |

### User Roles and Functionality

#### Consumer
- Browse the restaurant menu
- Filter menu items by category
- Add items to cart
- Adjust item quantities
- Place orders
- View order history

#### Kitchen Staff
- View incoming orders
- Update order status (pending, in preparation, delivered)
- Sort and filter orders

#### Manager
- Add new menu items
- Edit existing menu items
- Remove menu items
- View all orders
- Manage inventory (coming soon)

## Project Structure

\`\`\`
restaurant-management/
├── public/                  # Public assets
│   ├── images/              # Image assets
│   │   ├── food/            # Food images
│   │   └── ...
├── server/                  # Mock backend
│   └── db.json              # Database file
├── src/                     # Source code
│   ├── components/          # Reusable components
│   │   ├── food-svg/        # Food SVG components
│   │   ├── Layout.jsx       # Layout component
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── ...
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Cart.jsx         # Cart page
│   │   ├── ConsumerDashboard.jsx  # Consumer interface
│   │   ├── KitchenDashboard.jsx   # Kitchen interface
│   │   ├── ManagerDashboard.jsx   # Manager interface
│   │   └── ...
│   ├── App.jsx              # Main App component
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js       # Tailwind configuration
└── vite.config.js           # Vite configuration
\`\`\`

## API Endpoints

The application uses the following API endpoints:

### Authentication
- `GET /users` - Get all users (for authentication)
- `POST /users` - Register a new user

### Menu
- `GET /menu` - Get all menu items
- `GET /menu/:id` - Get a specific menu item
- `POST /menu` - Add a new menu item (manager only)
- `PUT /menu/:id` - Update a menu item (manager only)
- `DELETE /menu/:id` - Delete a menu item (manager only)

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order status

## Future Enhancements

- Online payment integration
- Reservation system
- Customer reviews and ratings
- Loyalty program
- Mobile app version
- Real-time order notifications

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Tailwind CSS for the styling framework
