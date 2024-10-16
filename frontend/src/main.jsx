import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthLayout from "./components/AuthLayout.jsx"
import {
  Home,
  Edit,
  Login,
  NewListing,
  Show,
  Signup,
} from "./pages/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element:<Home/>,
      },

      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
              <Signup />
          </AuthLayout>
        ),
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/listing/:id",
        element: <Show/>,
      },

      {
        path: "/listing/edit/:id",
        element:(
          <AuthLayout authentication={true}>
              <Edit />
          </AuthLayout>
        ),
      },

      {
        path: "listing/new",
        element:(
          <AuthLayout authentication={true}>
              <NewListing />
          </AuthLayout>
        ),
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
