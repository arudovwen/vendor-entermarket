import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//invoices
import invoices from "./invoices/reducer"

//tasks
import tasks from "./tasks/reducer"

//Dasboard saas
import dashboard from "./dashboard/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  invoices,
  tasks,
  dashboard,
})

export default rootReducer
