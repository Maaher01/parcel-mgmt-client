import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext)

  if (!user) return null

  if (!allowedRoles.includes(user.role)) return null

  return <>{children}</>
}

export default RequireRole
