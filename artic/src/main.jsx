import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import { AddPost, AllPost, EditPost, Home, LoginPage, PageNotFound, Post, RegistrationPage } from './pages/index.js'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    path: '/',
    element: (<AuthLayout authStatus={true}>
      <Home />
      </AuthLayout>)
  },
  {
    path: '/log-in',
    element: (<AuthLayout authStatus={false}>  
      <LoginPage />
      </AuthLayout>)
  },
  {
    path: '/sign-up',
    element: (<AuthLayout authStatus={false}>  
      <RegistrationPage />
      </AuthLayout>)
  },
  {
    path: '/all-posts',
    element: (<AuthLayout authStatus={true}>
      <AllPost/>
      </AuthLayout>)
  },
  {
    path: '/create-post',
    element: (<AuthLayout authStatus={true}>
      <AddPost/>
      </AuthLayout>)
  },
  {
    path: '/edit-post/:slug',
    element: (<AuthLayout authStatus={true}>
      <EditPost/>
      </AuthLayout>)
  },
  {
    path: '/post/:slug',
    element:(<AuthLayout authStatus={true}> <Post/> </AuthLayout>)
  },
  {
    path:'*',
    element: <PageNotFound/>
  }
],
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    {/* <App /> */}
    </Provider>
  </React.StrictMode>,
)
