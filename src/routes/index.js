import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index"
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index"
import EcommerceOthers from "../pages/Ecommerce/Others/categories"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//Admin login
import AdminLogin from "../pages/Admin/Authentication/Login"
import AdminLogout from "../pages/Admin/Authentication/Logout"
import AdminRegister from "../pages/Admin/Authentication/Register"
import AdminForgetPwd from "../pages/Admin/Authentication/ForgetPassword"

//  // Inner Authentication

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import AdminDashboard from "../pages/Admin/Dashboard/index"

//Admin Orders
import AdminOrders from "../pages/Admin/Orders/index"
import AdminOrdersAssigned from "../pages/Admin/Orders/assigned"
import AdminOrdersPending from "../pages/Admin/Orders/pending"




const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },

  //Ecommerce

  { path: "/ecommerce-products", component: EcommerceProducts },
  { path: "/ecommerce-orders", component: EcommerceOrders },





  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/admin/logout", component: AdminLogout },
  { path: "/admin/login", component: AdminLogin },
  { path: "/admin/forgot-password", component: AdminForgetPwd },
  { path: "/admin/register", component: AdminRegister },


]

const adminProtectedRoutes = [
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/orders", component: AdminOrders },
  { path: "/admin/orders/assigned", component: AdminOrdersAssigned },
  { path: "/admin/orders/pending", component: AdminOrdersPending },
  { path: "/admin-others", component: EcommerceOthers },

  {
    path: "/admin/dashboard",
    exact: true,
    component: () => <Redirect to="/admin" />,
  },
]

export { authProtectedRoutes, adminProtectedRoutes, publicRoutes }
