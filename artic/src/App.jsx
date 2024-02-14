import { useEffect, useState } from "react";
import { Footer, Header } from "./components"
import { useDispatch } from "react-redux";
import authService from './appwrite/auth.js'
import {login, logout } from './store/slice/authSlice.js'
import {LoginForm, RegistrationForm} from './components/index.js'

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData)
      dispatch(login(userData))
      else
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  },[])
  if(Loading)
  return <div className="text-3xl text-center font-semibold h-screen">Loading...</div>
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between ">
        <div className="w-full block">
          <Header />
          <h1>Artic</h1>
        Test
        <LoginForm/>  
        <RegistrationForm/>
        <Footer/>
        </div>
      </div>
    </>
  )
}

export default App
