import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBookmark,
  cilAddressBook,
  cilUser,
  cilBike,
  cilInbox,
} from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

export const Navigation = () => {
  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      roles: ['Admin', 'Customer', 'Delivery Agent'],
    },
    {
      component: CNavGroup,
      name: 'Booking',
      to: '/base',
      icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'New Booking',
          to: '/booking/add',
        },
        {
          component: CNavItem,
          name: 'My Bookings',
          to: '/my-bookings',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Agent Assign',
      to: '/created-bookings',
      icon: <CIcon icon={cilBike} customClassName="nav-icon" />,
      roles: ['Admin'],
    },
    {
      component: CNavItem,
      name: 'User Directory',
      to: '/users',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      roles: ['Admin'],
    },
    {
      component: CNavItem,
      name: 'All Bookings',
      to: '/bookings',
      icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
      roles: ['Admin'],
    },
    {
      component: CNavItem,
      name: 'Assigned Parcels',
      to: '/assigned-parcels',
      icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
      roles: ['Delivery Agent'],
    },
  ]

  return navItems
}
