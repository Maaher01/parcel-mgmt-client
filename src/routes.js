import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const newBooking = React.lazy(() => import('./views/pages/newBooking/newBooking'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/booking/add', name: 'New Booking', element: newBooking },
]

export default routes
