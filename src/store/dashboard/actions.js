import {
  API_SUCCESS,
  API_FAIL,
  GET_TOP_SELLING_PRODUCT,
  GET_EARNING_DATA,
  GET_STORE_EARNINGS,
  GET_STORE_EARNINGS_SUCCESS,
  GET_STORE_EARNINGS_FAIL,
  GET_TOP_EARNERS,
  GET_TOP_EARNERS_FAIL,
  GET_TOP_EARNERS_SUCCESS,
  GET_STORE_REPORT,
  GET_STORE_REPORT_FAIL,
  GET_STORE_REPORT_SUCCESS,
} from "./actionType"

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
})

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
})

// charts data
export const getTopSellingProduct = month => ({
  type: GET_TOP_SELLING_PRODUCT,
  payload: month,
})

/** Earning chart data */
export const getEarningChartsData = month => ({
  type: GET_EARNING_DATA,
  payload: month,
})

// Store reports
export const getStoreReport = () => ({
  type: GET_STORE_REPORT,
})
export const getStoreReportSuccess = data => ({
  type: GET_STORE_REPORT_SUCCESS,
  payload: data,
})
export const getStoreReportFail = error => ({
  type: GET_STORE_REPORT_FAIL,
  payload: error,
})

// top earners 
export const getTopEarners = () => ({
    type: GET_TOP_EARNERS,
  })
  export const getTopEarnersSuccess = data => ({
    type: GET_TOP_EARNERS_SUCCESS,
    payload: data,
  })
  export const getTopEarnersFail = error => ({
    type: GET_TOP_EARNERS_FAIL,
    payload: error,
  })

  // store earnings
  export const getStoreEarnings = () => ({
    type: GET_STORE_EARNINGS,
  })
  export const getStoreEarningsSuccess = data => ({
    type: GET_STORE_EARNINGS_SUCCESS,
    payload: data,
  })
  export const getStoreEarningsFail = error => ({
    type: GET_STORE_EARNINGS_FAIL,
    payload: error,
  })
