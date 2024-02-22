import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, LogOut } from "../index.js";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);

  const [toggle, setToggle] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/log-in",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/sign-up",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Create Post",
      path: "/create-post",
      active: authStatus,
    },
  ];
  useEffect(() => {
    console.log(location);
  });
  return (
    <div className="px-4 py-3 shadow-md ">
      <Container>
        <nav className="flex">
          <div>
            {/* logo */}
            <span
              className="text-2xl text-sky-600 font-semibold hover:cursor-pointer"
              onClick={() => {
                navigate("/");
                setToggle(false);
              }}
            >
              ARTIIC
            </span>
          </div>
          {/* for large screen */}
          <div className="hidden md:block ml-auto">
            <ul className="flex ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className={`inline-block px-4 py-2 duration-200 hover:bg-sky-100 rounded-full ${
                          location.pathname === item.path ? "text-sky-500" : ""
                        }`}
                        onClick={() => {
                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && <LogOut />}
            </ul>
          </div>
          {/* for small screen or mobile screen */}
          <div
            className={`absolute top-10  bg-white transition duration-2000 rounded-r-md z-10 shadow-md ${
              toggle ? "right-0" : "left-[-100%]"
            }`}
          >
            <ul className="px-4 pb-10 ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className={`inline-block px-4 py-2 duration-200 hover:bg-sky-100 rounded-full ${
                          location.pathname === item.path ? "text-sky-500" : ""
                        }`}
                        onClick={() => {
                          navigate(item.path);
                          setToggle(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && <LogOut />}
            </ul>
          </div>
          {/* hamburger btn */}
            <div className="ml-auto md:hidden">
          {authStatus?  (
              <>
              {!toggle && (
                  <span
                  className="text-2xl text-sky-600 font-semibold hover:cursor-pointer"
                  onClick={() => setToggle(true)}
                  >
                  =
                </span>
              )}
              {toggle && (
                  <span
                  className="text-2xl text-sky-600 font-semibold hover:cursor-pointer"
                  onClick={() => setToggle(false)}
                  >
                  X
                </span>
              )}
              </>):(
              <ul className="flex ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className={`inline-block px-4 py-2 duration-200 hover:bg-sky-100 rounded-full ${
                          location.pathname === item.path ? "text-sky-500" : ""
                        }`}
                        onClick={() => {
                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>
              
              )}
            </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
