import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })

  const login = (authToken) => {
    localStorage.setItem('isLoggedIn', true)
    setIsLoggedIn(true)
    localStorage.setItem('token', authToken)
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
