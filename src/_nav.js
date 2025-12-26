import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilBookmark } from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

export const Navigation = () => {
  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
          to: '/booking',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Agent Assign',
      to: '/created-bookings',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'User Directory',
      to: '/users',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Bookings',
      to: '/bookings',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Assigned Parcels',
      to: '/assigned-parcels',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
  ]

  return navItems
}
