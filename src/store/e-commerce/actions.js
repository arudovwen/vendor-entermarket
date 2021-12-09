
import {

  GET_CART_DATA,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  ADD_NEW_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCTS,
  ADD_NEW_PRODUCT,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_SHOPS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_COMMENTS,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_COMMENT_FAIL,
  ON_LIKE_REPLY,
  ON_LIKE_REPLY_SUCCESS,
  ON_LIKE_REPLY_FAIL,
  ON_ADD_REPLY,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_REPLY_FAIL,
  ON_ADD_COMMENT,
  ON_ADD_COMMENT_SUCCESS,
  ON_ADD_COMMENT_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
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
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAIL,
  ON_ADD_BRAND,
  ON_ADD_BRAND_SUCCESS,
  ON_ADD_BRAND_FAIL,
  ON_UPDATE_BRAND,
  ON_UPDATE_BRAND_FAIL,
  ON_UPDATE_BRAND_SUCCESS,
  ON_DELETE_BRAND,
  ON_DELETE_BRAND_FAIL,
  ON_DELETE_BRAND_SUCCESS,
  RESET_STATUS
} from "./actionTypes"

export const resetstatus = () => ({
  type: RESET_STATUS
})

export const getBrands = store_id => ({
  type: GET_BRANDS,
  store_id,
})
export const getBrandsSuccess = brands => ({
  type: GET_BRANDS_SUCCESS,
  payload: brands,
})
export const getBrandsFail = error => ({
  type: GET_BRANDS_FAIL,
  payload: error,
})
export const addNewBrand = brand => ({
  type: ON_ADD_BRAND,
  payload: brand,
})
export const addBrandSuccess = (brand, status) => ({
  type: ON_ADD_BRAND_SUCCESS,
  payload: brand,
  status
})

export const addBrandFail = error => ({
  type: ON_ADD_BRAND_FAIL,
  payload: error,
})

export const updateBrand = brand => ({
  type: ON_UPDATE_BRAND,
  payload: brand,
})

export const updateBrandSuccess = brand => ({
  type: ON_UPDATE_BRAND_SUCCESS,
  payload: brand,
})

export const updateBrandFail = error => ({
  type: ON_UPDATE_BRAND_FAIL,
  payload: error,
})

export const deleteBrand = brand => ({
  type: ON_DELETE_BRAND,
  payload: brand,
})

export const deleteBrandSuccess = brand => ({
  type: ON_DELETE_BRAND_SUCCESS,
  payload: brand,
})

export const deleteBrandFail = error => ({
  type: ON_DELETE_BRAND_FAIL,
  payload: error,
})
export const getCategories = store_id => ({
  type: GET_CATEGORIES,
  store_id,
})
export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
})
export const getCategoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  payload: error,
})
export const addNewCategory = category => ({
  type: ON_ADD_CATEGORY,
  payload: category,
})
export const addCategorySuccess = (category, status) => ({
  type: ON_ADD_CATEGORY_SUCCESS,
  payload: category,
  status
})

export const addCategoryFail = error => ({
  type: ON_ADD_CATEGORY_FAIL,
  payload: error,
})

export const updateCategory = category => ({
  type: ON_UPDATE_CATEGORY,
  payload: category,
})

export const updateCategorySuccess = category => ({
  type: ON_UPDATE_CATEGORY_SUCCESS,
  payload: category,
})

export const updateCategoryFail = error => ({
  type: ON_UPDATE_CATEGORY_FAIL,
  payload: error,
})

export const deleteCategory = category => ({
  type: ON_DELETE_CATEGORY,
  payload: category,
})

export const deleteCategorySuccess = category => ({
  type: ON_DELETE_CATEGORY_SUCCESS,
  payload: category,
})

export const deleteCategoryFail = error => ({
  type: ON_DELETE_CATEGORY_FAIL,
  payload: error,
})
export const getProducts = store_id => ({
  type: GET_PRODUCTS,
  store_id,
})
export const addNewProduct = product => ({
  type: ADD_NEW_PRODUCT,
  payload: product,
})
export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
})

export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const addProductSuccess = (product, status) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
  status
})

export const addProductFail = error => ({
  type: ADD_PRODUCT_FAIL,
  payload: error,
})

export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  payload: product,
})

export const updateProductSuccess = product => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
})

export const updateProductFail = error => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
})

export const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  payload: product,
})

export const deleteProductSuccess = product => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: product,
})

export const deleteProductFail = error => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
})

export const getProductDetail = productId => ({
  type: GET_PRODUCT_DETAIL,
  productId,
})

export const getProductDetailSuccess = products => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: products,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
})

export const getOrders = () => ({
  type: GET_ORDERS,
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  payload: order,
})

export const addOrderSuccess = order => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
})

export const addOrderFail = error => ({
  type: ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  payload: order,
})

export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrder = order => ({
  type: DELETE_ORDER,
  payload: order,
})

export const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})

export const getCartData = () => ({
  type: GET_CART_DATA,
})

export const getCartDataSuccess = cartData => ({
  type: GET_CART_DATA_SUCCESS,
  payload: cartData,
})

export const getCartDataFail = error => ({
  type: GET_CART_DATA_FAIL,
  payload: error,
})

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
})

export const getCustomersSuccess = customers => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
})

export const getCustomersFail = error => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
})

export const addNewCustomer = customer => ({
  type: ADD_NEW_CUSTOMER,
  payload: customer,
})

export const addCustomerSuccess = customer => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer,
})

export const addCustomerFail = error => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
})

export const updateCustomer = customer => ({
  type: UPDATE_CUSTOMER,
  payload: customer,
})

export const updateCustomerSuccess = customer => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const updateCustomerFail = error => ({
  type: UPDATE_CUSTOMER_FAIL,
  payload: error,
})

export const deleteCustomer = customer => ({
  type: DELETE_CUSTOMER,
  payload: customer,
})

export const deleteCustomerSuccess = customer => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const deleteCustomerFail = error => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
})

export const getShops = () => ({
  type: GET_SHOPS,
})

export const getShopsSuccess = shops => ({
  type: GET_SHOPS_SUCCESS,
  payload: shops,
})

export const getShopsFail = error => ({
  type: GET_SHOPS_FAIL,
  payload: error,
})

export const getProductComments = () => ({
  type: GET_PRODUCT_COMMENTS,
})

export const getProductCommentsSuccess = comments => ({
  type: GET_PRODUCT_COMMENTS_SUCCESS,
  payload: comments,
})

export const getProductCommentsFail = error => ({
  type: GET_PRODUCT_COMMENTS_FAIL,
  payload: error,
})

export const onLikeComment = (commentId, productId) => ({
  type: ON_LIKE_COMMENT,
  payload: { commentId, productId },
})

export const onLikeCommentSuccess = comments => ({
  type: ON_LIKE_COMMENT_SUCCESS,
  payload: comments,
})

export const onLikeCommentFail = error => ({
  type: ON_LIKE_COMMENT_FAIL,
  payload: error,
})

export const onLikeReply = (commentId, productId, replyId) => ({
  type: ON_LIKE_REPLY,
  payload: { commentId, productId, replyId },
})

export const onLikeReplySuccess = comments => ({
  type: ON_LIKE_REPLY_SUCCESS,
  payload: comments,
})

export const onLikeReplyFail = error => ({
  type: ON_LIKE_REPLY_FAIL,
  payload: error,
})

export const onAddReply = (commentId, productId, replyText) => ({
  type: ON_ADD_REPLY,
  payload: { commentId, productId, replyText },
})

export const onAddReplySuccess = comments => ({
  type: ON_ADD_REPLY_SUCCESS,
  payload: comments,
})

export const onAddReplyFail = error => ({
  type: ON_ADD_REPLY_FAIL,
  payload: error,
})

export const onAddComment = (productId, commentText) => ({
  type: ON_ADD_COMMENT,
  payload: { productId, commentText },
})

export const onAddCommentSuccess = comments => ({
  type: ON_ADD_COMMENT_SUCCESS,
  payload: comments,
})

export const onAddCommentFail = error => ({
  type: ON_ADD_COMMENT_FAIL,
  payload: error,
})
