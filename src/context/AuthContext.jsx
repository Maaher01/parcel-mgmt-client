import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  const login = (authToken) => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    localStorage.setItem('token', authToken)
    const decoded = jwtDecode(authToken)
    setUser(decoded.UserInfo)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    setUser(null)
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
