import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return isLoggedIn ? <Navigate to="/" replace /> : children
}

export default PublicRoute
