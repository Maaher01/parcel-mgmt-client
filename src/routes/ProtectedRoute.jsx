import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import DefaultLayout from '../layout/DefaultLayout'
import { Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return isLoggedIn ? <DefaultLayout /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
