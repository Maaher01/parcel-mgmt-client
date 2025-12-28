import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const newBooking = React.lazy(() => import('./views/pages/newBooking/newBooking'))
const myBookings = React.lazy(() => import('./views/pages/myBookings/myBookings'))
const createdBookings = React.lazy(() => import('./views/pages/createdBookings/createdBookings'))
const allUsersList = React.lazy(() => import('./views/pages/allUsersList/allUsersList'))
const allBookingsList = React.lazy(() => import('./views/pages/allBookingsList/allBookingsList'))
const assignedBookings = React.lazy(() => import('./views/pages/assignedBookings/assignedBookings'))
const bookingDetails = React.lazy(() => import('./views/pages/bookingDetails/bookingDetails'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/booking/add', name: 'New Booking', element: newBooking },
  { path: '/my-bookings', name: 'My Bookings', element: myBookings },
  { path: '/created-bookings', name: 'Created Bookings', element: createdBookings },
  { path: '/users', name: 'All Users List', element: allUsersList },
  { path: '/bookings', name: 'All Bookings List', element: allBookingsList },
  { path: '/assigned-parcels', name: 'Assigned Bookings', element: assignedBookings },
  { path: '/booking/:bookingId', name: 'Booking Details', element: bookingDetails },
]

export default routes
