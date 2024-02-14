import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { Container, LogOut} from '../index.js'

const Header = () => {
    // const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: "Home",
            path: "/",
            active: authStatus
        },
        {
            name: "Login",
            path: "/log-in",
            active: !authStatus            
        },
        {
            name: "Signup",
            path: "/sign-up",
            active: !authStatus
        },
        {
            name:"All Posts",
            path: "/all-posts",
            active: authStatus
        },
        {
            name:"Create Post",
            path: "/create-post",
            active: authStatus
        }
    ]
  return (
    <div className='py-3 shadow-md '>
      <Container>
        <nav className='flex'>
            <div>
                {/* logo */}
                <span className='text-2xl text-sky-600 font-semibold'>Artic</span>
            </div>
            <ul className='flex ml-auto'>
            {
                navItems.map(item=>(
                    item.active &&
                    <li key={item.name}>
                        <button
                        className={`inline-block px-4 py-2 duration-200 hover:bg-sky-100 rounded-full `}
                        onClick={() => {
                            // navigate(item.path)
                        }}
                        >
                        {item.name}
                        </button>
                    </li>
                ))
            }
            {
                !authStatus && <LogOut/>
            }
            </ul>
        </nav>
    </Container>      
    </div>
  )
}

export default Header
