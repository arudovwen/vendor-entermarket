import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import {
  GET_CART_DATA,
  GET_CATEGORIES,
  ON_ADD_CATEGORY,
  ON_UPDATE_CATEGORY,
  ON_DELETE_CATEGORY,
  GET_BRANDS,
  ON_ADD_BRAND,
  ON_UPDATE_BRAND,
  ON_DELETE_BRAND,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS,
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_PRODUCT_COMMENTS,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  ON_ADD_REPLY,
  ON_ADD_COMMENT,
} from "./actionTypes"
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getCategoriesFail,
  getCategoriesSuccess,
  getBrandsSuccess,
  getBrandsFail,
  getOrdersFail,
  getOrdersSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  addProductFail,
  addProductSuccess,
  updateProductSuccess,
  updateProductFail,
  deleteProductSuccess,
  deleteProductFail,
  getShopsFail,
  getShopsSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getProductCommentsSuccess,
  getProductCommentsFail,
  onLikeCommentSuccess,
  onLikeCommentFail,
  onLikeReplySuccess,
  onLikeReplyFail,
  onAddReplySuccess,
  onAddReplyFail,
  onAddCommentSuccess,
  onAddCommentFail,
  addBrandFail,
  addBrandSuccess,
  updateBrandFail,
  updateBrandSuccess,
  deleteBrandFail,
  deleteBrandSuccess,
  addCategoryFail,
  addCategorySuccess,
  updateCategoryFail,
  updateCategorySuccess,
  deleteCategoryFail,
  deleteCategorySuccess

} from "./actions"

//Include Both Helper File with needed methods
import {
  getCategories,
  getCartData,
  getCustomers,
  getOrders,
  getProducts,
  getShops,
  getProductDetail,
  addNewProduct,
  updateProduct,
  deleteProduct,
  addNewOrder,
  updateOrder,
  deleteOrder,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getProductComents as getProductComentsApi,
  getBrands as getBrandsApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  onAddReply as onAddReplyApi,
  onAddComment as onAddCommentApi,
  addNewBrand as onAddNewBrandApi,
  updateBrand as onUpdateBrandApi,
  deleteBrand as onDeleteBrandApi,
  addNewCategory as onAddNewCategoryApi,
  updateCategory as onUpdateCategoryApi,
  deleteCategory as onDeleteCategoryApi
} from "helpers/backend_helper"

function* fetchBrands() {
  try {
    const response = yield call(getBrandsApi)

    yield put(getBrandsSuccess(response))
  } catch (error) {
    yield put(getBrandsFail(error))
  }
}
function* onDeleteBrand({ payload: brand }) {
  try {
    const response = yield call(onDeleteBrandApi, brand)

    yield put(deleteBrandSuccess(response))
  } catch (error) {
    yield put(deleteBrandFail(error))
  }
}

function* onAddNewBrand({ payload: brand }) {
  try {
    const response = yield call(onAddNewBrandApi, brand)
    yield put(addBrandSuccess(response))
  } catch (error) {
    yield put(addBrandSuccess(error))
  }
}
function* onUpdateBrand({ payload }) {
  try {
    const response = yield call(onUpdateBrandApi, payload)
    yield put(updateBrandSuccess(response))
  } catch (error) {
    yield put(updateBrandSuccess(error))
  }
}

function* fetchCategories() {
  try {
    const response = yield call(getCategories)

    yield put(getCategoriesSuccess(response))
  } catch (error) {
    yield put(getCategoriesFail(error))
  }
}
function* onDeleteCategory({ payload: category }) {
  try {
    const response = yield call(onDeleteCategoryApi, category)

    yield put(deleteCategorySuccess(response))
  } catch (error) {
    yield put(deleteCategoryFail(error))
  }
}

function* onAddNewCategory({ payload: category }) {
  try {
    const response = yield call(onAddNewCategoryApi, category)
    yield put(addCategorySuccess(response))
  } catch (error) {
    yield put(addCategorySuccess(error))
  }
}
function* onUpdateCategory({ payload }) {
  try {
    const response = yield call(onUpdateCategoryApi, payload)
    yield put(updateCategorySuccess(response))
  } catch (error) {
    yield put(updateCategorySuccess(error))
  }
}
function* fetchProducts({ store_id }) {
  try {
    const response = yield call(getProducts)

    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}
function* onDeleteProduct({ payload: product }) {
  try {
    const response = yield call(deleteProduct, product)

    yield put(deleteProductSuccess(response))
  } catch (error) {
    yield put(deleteProductFail(error))
  }
}

function* onAddNewProduct({ payload: product }) {
  try {
    const response = yield call(addNewProduct, product)
    yield put(addProductSuccess(response))
  } catch (error) {
    yield put(addProductFail(error))
  }
}
function* onUpdateProduct({ payload }) {
  try {
    const response = yield call(updateProduct, payload)
    yield put(updateProductSuccess(response))
  } catch (error) {
    yield put(updateProductFail(error))
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId)

    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders)

    yield put(getOrdersSuccess(response))
  } catch (error) {
    yield put(getOrdersFail(error))
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData)
    yield put(getCartDataSuccess(response))
  } catch (error) {
    yield put(getCartDataFail(error))
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers)
    yield put(getCustomersSuccess(response))
  } catch (error) {
    yield put(getCustomersFail(error))
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer)
    yield put(updateCustomerSuccess(response))
  } catch (error) {
    yield put(updateCustomerFail(error))
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer)
    yield put(deleteCustomerSuccess(response))
  } catch (error) {
    yield put(deleteCustomerFail(error))
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer)

    yield put(addCustomerSuccess(response))
  } catch (error) {
    yield put(addCustomerFail(error))
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops)
    yield put(getShopsSuccess(response))
  } catch (error) {
    yield put(getShopsFail(error))
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order)
    yield put(updateOrderSuccess(response))
  } catch (error) {
    yield put(updateOrderFail(error))
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order)
    yield put(deleteOrderSuccess(response))
  } catch (error) {
    yield put(deleteOrderFail(error))
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order)
    yield put(addOrderSuccess(response))
  } catch (error) {
    yield put(addOrderFail(error))
  }
}

function* getProductComents() {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(getProductComentsApi)
    yield put(getProductCommentsSuccess(response))
  } catch (error) {
    yield put(getProductCommentsFail(error))
  }
}

function* onLikeComment({ payload: { commentId, productId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, productId)
    yield put(onLikeCommentSuccess(response))
  } catch (error) {
    yield put(onLikeCommentFail(error))
  }
}

function* onLikeReply({ payload: { commentId, productId, replyId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, productId, replyId)
    yield put(onLikeReplySuccess(response))
  } catch (error) {
    yield put(onLikeReplyFail(error))
  }
}

function* onAddReply({ payload: { commentId, productId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, productId, replyText)
    yield put(onAddReplySuccess(response))
  } catch (error) {
    yield put(onAddReplyFail(error))
  }
}

function* onAddComment({ payload: { productId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, productId, commentText)
    yield put(onAddCommentSuccess(response))
  } catch (error) {
    yield put(onAddCommentFail(error))
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategories)
  yield takeEvery(ON_ADD_CATEGORY, onAddNewCategory)
  yield takeEvery(ON_DELETE_CATEGORY, onDeleteCategory)
  yield takeEvery(ON_UPDATE_CATEGORY, onUpdateCategory)
  yield takeEvery(GET_BRANDS, fetchBrands)
  yield takeEvery(ON_ADD_BRAND, onAddNewBrand)
  yield takeEvery(ON_DELETE_BRAND, onDeleteBrand)
  yield takeEvery(ON_UPDATE_BRAND, onUpdateBrand)
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(ADD_NEW_PRODUCT, onAddNewProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
  yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(GET_ORDERS, fetchOrders)
  yield takeEvery(GET_CART_DATA, fetchCartData)
  yield takeEvery(GET_CUSTOMERS, fetchCustomers)
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer)
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer)
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer)
  yield takeEvery(GET_SHOPS, fetchShops)
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder)
  yield takeEvery(UPDATE_ORDER, onUpdateOrder)
  yield takeEvery(DELETE_ORDER, onDeleteOrder)
  yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents)
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment)
  yield takeEvery(ON_LIKE_REPLY, onLikeReply)
  yield takeEvery(ON_ADD_REPLY, onAddReply)
  yield takeEvery(ON_ADD_COMMENT, onAddComment)
}

export default ecommerceSaga
