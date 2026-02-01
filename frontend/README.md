# Restaurant Admin Dashboard
# Project Overview
The Restaurant Admin Dashboard is a full-stack web application designed for restaurant owners and staff to manage menu items and orders efficiently.It acts as an admin portal, not a customer-facing application.
The system allows admins to:
1Manage menu items (CRUD operations)
2.Control item availability
3.rack and manage orders
4.Update order status
5.Analyze order data using MongoDB aggregation*

The project demonstrates real-world backend APIs, optimized React frontend, and clean admin workflows
# Features Implemented
# Menu Management (Admin)

1.View all menu items in a responsive grid
2.Search menu items with debouncing (300ms)
3.Filter menu items by category and availability
4.Add new menu items
5.Edit existing menu items
6.Delete menu items
7.Toggle menu item availability with Optimistic UI updates
8.Display menu item images with safe fallback handling

# Orders Dashboard
1.View all orders with status badges
2.Filter orders by status
3.Pagination support
4.Update order status via dropdown
5.View detailed order information (expanded view)
6.Populate menu item details inside orders
# Technical Highlights
1.RESTful API design
2.MongoDB indexing and aggregation
3.Optimistic UI updates
4.Custom React hooks (useDebounce)
5.Centralized error handling
6.Production-ready seed data
# Tech Stack
# Frontend
React 18+
Tailwind CSS
Axios
# Backend

Node.js
Express.js
MongoDB
Mongoose
dotenv
CORS
# Database
MongoDB Atlas (Free Tier)
# Project Structure image
![Project Structre](screenshots/projectStructure.png)

# Prerequisites
Before running the project, ensure you have:
Node.js (v18 or higher)
MongoDB Atlas account (free tier)
npm or yarn
Git

# Installation & Setup
# Step 1: Clone Repository
git clone <your-repository-url>
cd restaurant-admin-dashboard
# Step 2: Backend Setup
cd backend
npm install
Create .env file in backend/:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
Start backend server:
npm run dev
# Step 3: Seed Database
npm run seed
# Step 4: Frontend Setup
cd ../frontend
npm install
npm run dev
Create .env in frontend/:
VITE_API_URL=http://localhost:5000/api
# Environment Variables
Backend
Variable	Description
PORT	Server port
MONGODB_URI	MongoDB Atlas connection string
NODE_ENV	Environment mode
Frontend
Variable	Description
VITE_API_URL	Backend API base URL
# API Endpoints Documentation
# Menu APIs
Get All Menu Items
GET /api/menu
Query Params:
category
isAvailable
Response:

{
  "success": true,
  "data": [ { "name": "Paneer Tikka", "price": 249 } ]
}

Search Menu Items
GET /api/menu/search?q=pizza

Create Menu Item
POST /api/menu

Request Body:

{
  "name": "Veg Burger",
  "category": "Main Course",
  "price": 199,
  "imageUrl": "https://..."
}

Toggle Availability
PATCH /api/menu/:id/availability

Order APIs
Get Orders (Pagination + Filter)
GET /api/orders?page=1&limit=5&status=Pending

Create Order
POST /api/orders

Update Order Status
PATCH /api/orders/:id/status

# MongoDB Aggregation (Top Selling Items)

Implemented aggregation pipeline using:
$unwind
$group
$lookup
$sort
$limit

## Challenges Faced & Solutions

1. Search Performance

Problem: Too many API calls while typing
Solution: Implemented useDebounce custom hook (300ms delay)

2. Optimistic UI Consistency
Problem: UI delay while toggling availability
Solution: Updated UI immediately and rolled back on API failure
3. Image Loading Errors

Problem: External image URLs blocked
Solution:
Used CDN-safe image URLs

Added local fallback image handling
4. Unique Order Number in Seed Script

Problem: Duplicate key error during seeding
Solution: Generated unique orderNumber explicitly in seed script

## Screenshots

### Menu Management Page

![Menu Management](screenshots/menu-management.png)

### Orders Dashboard

![Orders Dashboard](screenshots/orders-dashboard.png)

### Add / Edit Menu Modal

![Add Menu Modal](screenshots/add-menu-modal.png)

# Deployment

Frontend: Netlify
Backend: Render
Database: MongoDB Atlas

# Final Notes

This project follows real-world admin dashboard practices
Focused on clarity, performance, and maintainability
Avoided over-engineering while meeting all assignment requirements
