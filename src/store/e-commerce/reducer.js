import {
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY_SUCCESS,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_COMMENT_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_BRANDS_FAIL,
  GET_BRANDS_SUCCESS,
  ON_ADD_CATEGORY,
  ON_ADD_CATEGORY_SUCCESS,
  ON_ADD_CATEGORY_FAIL,
  ON_UPDATE_CATEGORY,
  ON_UPDATE_CATEGORY_SUCCESS,
  ON_UPDATE_CATEGORY_FAIL,
  ON_DELETE_CATEGORY,
  ON_DELETE_CATEGORY_SUCCESS,
  ON_DELETE_CATEGORY_FAIL,
  GET_BRANDS,
  ON_ADD_BRAND,
  ON_ADD_BRAND_SUCCESS,
  ON_ADD_BRAND_FAIL,
  ON_UPDATE_BRAND,
  ON_UPDATE_BRAND_FAIL,
  ON_UPDATE_BRAND_SUCCESS,
  ON_DELETE_BRAND,
  ON_DELETE_BRAND_FAIL,
  ON_DELETE_BRAND_SUCCESS,
  RESET_STATUS,
} from "./actionTypes"

const INIT_STATE = {
  brands: [],
  categories: [],
  products: [],
  product: {},
  orders: [],
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  productComments: [],
  status: null,
}

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_STATUS:
      return {
        ...state,
        status: null,
      }
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
      }
    case GET_BRANDS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_ADD_BRAND_SUCCESS:
      return {
        ...state,
        brands: [...state.brands, action.payload],
        status: action.type,
      }

    case ON_ADD_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        status: action.type,
        brands: state.brands.map(brand =>
          brand.id.toString() === action.payload.id.toString()
            ? { brand, ...action.payload }
            : brand
        ),
      }

    case ON_UPDATE_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_DELETE_BRAND_SUCCESS:
      return {
        ...state,
        status: action.type,
        brands: state.brands.filter(
          brand => brand.id.toString() !== action.payload.id.toString()
        ),
      }

    case ON_DELETE_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        status: action.type,
      }

    case ON_ADD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        status: action.type,
        categories: state.categories.map(category =>
          category.id.toString() === action.payload.id.toString()
            ? { category, ...action.payload }
            : category
        ),
      }

    case ON_UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ON_DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        status: action.type,
        categories: state.categories.filter(
          category => category.id.toString() !== action.payload.id.toString()
        ),
      }

    case ON_DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,

        products: action.payload,
      }

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        status: action.type,
      }

    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        status: action.type,
        products: state.products.map(product =>
          product.id.toString() === action.payload.id.toString()
            ? { product, ...action.payload }
            : product
        ),
      }

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          product => product.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id.toString() === action.payload.id.toString()
            ? { order, ...action.payload }
            : order
        ),
      }

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: action.payload,
      }

    case GET_CART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      }

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      }

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_COMMENTS_SUCCESS:
    case ON_LIKE_COMMENT_SUCCESS:
    case ON_LIKE_REPLY_SUCCESS:
    case ON_ADD_REPLY_SUCCESS:
    case ON_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        productComments: action.payload,
      }

    case GET_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Ecommerce
