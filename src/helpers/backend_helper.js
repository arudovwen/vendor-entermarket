import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

const token = localStorage.getItem("user-token")
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postRegister = data => {
  return axios
    .post(`${process.env.REACT_APP_URL}/stores`, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err.response.data
            break
        }
      }
      throw message
    })
}
const postRegisterAdmin = data => {
  return axios
    .post(`${process.env.REACT_APP_URL}/admin/register`, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err.response.data
            break
        }
      }
      throw message
    })
}

// Login Method
const postLogin = data => post(url.POST_LOGIN, data)
const postLoginAdmin = data => post(url.ADMIN_POST_LOGIN, data)


// postForgetPwd
const postForgetPwd = data => post(url.POST_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postProfile = data => post(url.POST_EDIT_PROFILE, data, config)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get BRANDS
export const getBrands = store_id => get(`${url.FETCH_BRANDS}/${store_id}`)

// add brand
export const addNewBrand = data => post(url.ADD_NEW_BRAND, data, config)

// update brand
export const updateBrand = data =>
  put(`${url.UPDATE_BRAND}/${data.id}`, data, config)

// delete brand
export const deleteBrand = data => del(`${url.DELETE_BRAND}/${data.id}`, config)

// get Categories
export const getCategories = store_id =>
  get(`${url.GET_CATEGORIES}/${store_id}`)

// add category
export const addNewCategory = data => post(url.ADD_NEW_CATEGORY, data, config)

// update category
export const updateCategory = data =>
  put(`${url.UPDATE_CATEGORY}/${data.id}`, data, config)

// delete category
export const deleteCategory = data =>
  del(`${url.DELETE_CATEGORY}/${data.id}`, config)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS, config)

// add product
export const addNewProduct = data => post(url.ADD_NEW_PRODUCT, data, config)

// update Product
export const updateProduct = data =>
  put(`${url.UPDATE_PRODUCT}/${data.id}`, data)

// delete Product
export const deleteProduct = data => del(`${url.DELETE_PRODUCT}/${data.id}`)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS, config)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS)

// get importantmail

const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS)

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

const storeReport = () => {
  return get(url.GET_STORE_REPORT, config)
}

const topEarner = () => {
  return get(url.GET_TOP_EARNERS, config)
}

const storeEarnings = () => {
  return get(url.GET_STORE_EARNINGS, config)
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postRegister,
  postRegisterAdmin,
  postLogin,
  postLoginAdmin,
  postProfile,
  postForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
  storeReport,
  storeEarnings,
  topEarner,
}
