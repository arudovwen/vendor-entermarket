import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  ADMIN_REGISTER_USER,
  ADMIN_REGISTER_USER_SUCCESSFUL,
  ADMIN_REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}

export const registerUserAdmin = user => {
  return {
    type: ADMIN_REGISTER_USER,
    payload: { user },
  }
}

export const registerUserAdminSuccessful = user => {
  return {
    type: ADMIN_REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserAdminFailed = user => {
  return {
    type: ADMIN_REGISTER_USER_FAILED,
    payload: user,
  }
}
