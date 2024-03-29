import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index"
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index"
import EcommercePendingOrders from "../pages/Ecommerce/EcommerceOrders/pending"
import EcommerceFailedOrders from "../pages/Ecommerce/EcommerceOrders/failed"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"



const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  //Ecommerce

  { path: "/products", component: EcommerceProducts },
  { path: "/completed-orders", component: EcommerceOrders },
  { path: "/pending-orders", component: EcommercePendingOrders },
  { path: "/failed-orders", component: EcommerceFailedOrders },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  {
    path: "*",
    exact: true,
    component: () => <Redirect to="/login" />,
  },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },


]


export { authProtectedRoutes,  publicRoutes }
