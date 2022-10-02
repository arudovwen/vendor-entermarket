//REGISTER
export const POST_REGISTER = "/stores"
export const ADMIN_POST_REGISTER = "/admin/register"

//LOGIN
export const POST_LOGIN = "/store/login"
export const ADMIN_POST_LOGIN = "/admin/login"
export const POST_JWT_LOGIN = "/post-jwt-login"
export const POST_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/store/update"

//BRANDS
export const FETCH_BRANDS = "/brands"
export const ADD_NEW_BRAND = "/brands"
export const UPDATE_BRAND = "/brands"
export const DELETE_BRAND = "/brands"

//CATEGORIES
export const GET_CATEGORIES = "/categories"
export const ADD_NEW_CATEGORY = "/categories"
export const UPDATE_CATEGORY = "/categories"
export const DELETE_CATEGORY = "/categories"
//PRODUCTS
export const GET_PRODUCTS = "/store/get/products"
export const ADD_NEW_PRODUCT = "/product/add"
export const DELETE_PRODUCT = "/products"
export const UPDATE_PRODUCT = "/products"
export const GET_PRODUCTS_DETAIL = "/products"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"
// import { GET_TOP_EARNERS } from './../store/dashboard/actionType';
import { GET_BRANDS } from './../store/e-commerce/actionTypes';

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/store/get/order"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"

export const GET_STORE_REPORT = '/store/report'
export const GET_STORE_EARNINGS = '/store/earnings'
export const GET_TOP_EARNERS = 'top/earnings'