# Courier Management System Server

This is a full-stack courier and parcel management system which supports parcel booking, delivery agent assignment, real-time status updates and admin analytics.

## To run the server:

`cd` into the project folder and run `npm install` to install all dependencies.

Create a PostgreSQL database and run the SQL script titled dbScript.sql, which is present in the root of the project.

Add a .env file and add your own environment variables.

Then, run `npm run start` to start the server.

---

## To run the React app:

`cd` into the project folder and run `npm install` to install all dependencies.

Then, run `npm run start` to start the app.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Socket.IO

### Frontend

- React
- React Router
- Socket.IO Client
- Leaflet
- OpenStreetMap + OSRM

### Tools

- Postman
- Git & GitHub

---

## User Roles

- **Admin**
- **Delivery Agent**
- **Customer**

Each role has separate permissions enforced through role-based middleware.

---

## Features

### Customer

- Register & login
- Book parcel pickup (pickup address, delivery address, parcel size, payment type)
- View booking history
- View booking details
- Track parcel location on map

---

### Delivery Agent

- View assigned parcels
- Update parcel status:
  - Created
  - Picked Up
  - In Transit
  - Delivered
  - Cancelled
- Share live location via coordinates
- View optimized delivery route (based on approximate area-level locations. Due to limitations of free geocoding and map data:
  Exact house-level addresses are not always accurately displayed
  The feature works best for area-to-area navigation, not precise doorstep routing. This limitation is acknowledged and documented as a known constraint of the system)

---

### Admin

- Dashboard with booking analytics:
  - Daily bookings
  - Failed deliveries
  - COD amounts
- Assign delivery agents to parcels
- View all users
- View all bookings
- Export booking data (CSV & PDF)

---

## Authentication & Authorization

- JWT-based authentication
- Role-based access control using middleware
- All protected routes require a valid token
- Access is restricted based on user role (Admin, Agent, Customer)

---

## Real-Time Features

- Parcel status updates using Socket.IO
- Live delivery agent location updates
- Customers receive real-time status changes without page refresh

---
