import {
  API_SUCCESS,
  API_FAIL,
  GET_TOP_SELLING_PRODUCT,
  GET_EARNING_DATA,
  GET_STORE_EARNINGS_SUCCESS,
  GET_STORE_EARNINGS_FAIL,
  GET_TOP_EARNERS_FAIL,
  GET_TOP_EARNERS_SUCCESS,
  GET_STORE_REPORT_FAIL,
  GET_STORE_REPORT_SUCCESS,
} from "./actionType"

const INIT_STATE = {
  sellingData: [],
  earningChartData: [],
  reports: [],
  earnings: {},
  topearners: [],
  error: null,
}

const Dashboard = (state = INIT_STATE, action) => {

  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TOP_SELLING_PRODUCT:
          return {
            ...state,
            sellingData: action.payload.data,
          }

        case GET_EARNING_DATA:
          return {
            ...state,
            earningChartData: action.payload.data,
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_TOP_SELLING_PRODUCT:
          return {
            ...state,
            sellingDataError: action.payload.error,
          }

        case GET_EARNING_DATA:
          return {
            ...state,
            earningChartDataError: action.payload.error,
          }

        default:
          return state
      }
    case GET_STORE_REPORT_SUCCESS:
      return {
        ...state,
        reports: action.payload,
      }
    case GET_STORE_REPORT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_STORE_EARNINGS_SUCCESS:
      return {
        ...state,
        earnings: action.payload,
      }
    case GET_STORE_EARNINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_TOP_EARNERS_SUCCESS:
      return {
        ...state,
        topearners: action.payload,
      }
    case GET_TOP_EARNERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Dashboard
