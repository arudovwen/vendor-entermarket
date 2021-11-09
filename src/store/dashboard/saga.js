import { call, put, takeEvery, all, fork } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_TOP_SELLING_PRODUCT,
  GET_EARNING_DATA,
  GET_TOP_EARNERS,
  GET_STORE_EARNINGS,
  GET_STORE_REPORT,
} from "./actionType"
import {
  apiSuccess,
  apiFail,
  getStoreReportSuccess,
  getStoreReportFail,
  getTopEarnersSuccess,
  getTopEarnersFail,
  getStoreEarningsSuccess,
  getStoreEarningsFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  topSellingData as topSellingDataApi,
  getEarningChartsData as getEarningChartsDataApi,
  storeReport as getStoreReportApi,
  storeEarnings as getStoreEarningsApi,
  topEarner as getTopEarnersApi
} from "../../helpers/backend_helper"

function* getSellingData({ payload: month }) {
  try {
    var response = yield call(topSellingDataApi, month)
    yield put(apiSuccess(GET_TOP_SELLING_PRODUCT, response))
  } catch (error) {
    yield put(apiFail(GET_TOP_SELLING_PRODUCT, error))
  }
}

function* getStoreReport(){
  try {
    var response = yield call(getStoreReportApi)
    
     yield put( getStoreReportSuccess(response))

  }catch(error){
      yield put( getStoreReportFail(error))
  }
}

function* getStoreEarnings(){
  try {
    var response = yield call(getStoreEarningsApi)
    yield put(getStoreEarningsSuccess(response))

  }catch(error){
     yield put( getStoreEarningsFail(error))
  }
}
function* getTopEarnings(){
  try {
    var response = yield call(getTopEarnersApi)
    yield put(getTopEarnersSuccess(response))

  }catch(error){
     yield put( getTopEarnersFail(error))
  }
}

function* getEarningChartsData({ payload: month }) {
  try {
    var response = yield call(getEarningChartsDataApi, month)
    yield put(apiSuccess(GET_EARNING_DATA, response))
  } catch (error) {
    yield put(apiFail(GET_EARNING_DATA, error))
  }
}

export function* watchGetSellingdata() {
  yield takeEvery(GET_TOP_SELLING_PRODUCT, getSellingData)
}

export function* watchGetEarningChartsData() {
  yield takeEvery(GET_EARNING_DATA, getEarningChartsData)
  yield takeEvery(GET_STORE_REPORT, getStoreReport)
  yield takeEvery(GET_STORE_EARNINGS, getStoreEarnings)
  yield takeEvery(GET_TOP_EARNERS, getTopEarnings)
}

function* dashboardSaga() {
  yield all(
    [fork(watchGetSellingdata)],
    yield all([fork(watchGetEarningChartsData)])
  )
}

export default dashboardSaga
