import WidgetsDropdown from '../widgets/WidgetsDropdown'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <h3 className="mb-4">Hello 👋, {user.name}</h3>
      <WidgetsDropdown className="mb-4" />
    </>
  )
}

export default Dashboard
