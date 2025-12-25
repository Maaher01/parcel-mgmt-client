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
          to: '/',
        },
      ],
    },
  ]

  return navItems
}
