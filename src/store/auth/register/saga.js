import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER, ADMIN_REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed, registerUserAdminSuccessful, registerUserAdminFailed } from "./actions"

//Include Both Helper File with needed methods

import {
  postRegister,
  postRegisterAdmin

} from "../../../helpers/backend_helper"


// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {

    const response = yield call(postRegister, user)

      yield put(registerUserSuccessful(response))


  } catch (error) {
    yield put(registerUserFailed(error))
  }
}


function* registerUserAdmin({ payload: { user } }) {
  try {
    const response = yield call(postRegisterAdmin, user)

    yield put(registerUserAdminSuccessful(response))
  } catch (error) {
    yield put(registerUserAdminFailed(error))
  }
}


export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}
export function* watchUserRegisterAdmin() {
  yield takeEvery(ADMIN_REGISTER_USER, registerUserAdmin)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
  yield all([fork(watchUserRegisterAdmin)])
}


export default accountSaga
