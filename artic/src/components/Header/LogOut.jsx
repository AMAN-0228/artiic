import Button from '../Button'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const navigate = useNavigate()
  const logOut = async() => {
    await authService.logOut()
    navigate('/')
    window.location.reload()
  }
  return (
    <Button  onClick={logOut}>
      LogOut
    </Button>
  )
}

export default LogOut
