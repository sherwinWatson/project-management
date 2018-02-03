export const LOGIN = 'USER::LOGIN'
export const LOGIN_SUCCESS = 'USER::LOGIN_SUCCESS'
export const LOGIN_ERROR = 'USER::LOGIN_ERROR'
export const LOGOUT = 'USER::LOGOUT'
export const GET_ME_SUCCESS = 'USER::GET_ME_SUCCESS'
export const GET_ME_ERROR = 'USER::GET_ME_ERROR'
export const GET_OUTLETS = 'USER::GET_OUTLETS'
export const GET_OUTLETS_SUCCESS = 'USER::GET_OUTLETS_SUCCESS'
export const GET_OUTLETS_ERROR = 'USER::GET_OUTLETS_ERROR'
export const CHANGE_OUTLET = 'USER::CHANGE_OUTLET'
export const CHANGE_PIN = 'USER::CHANGE_PIN'
export const CHANGE_PIN_SUCCESS = 'USER::CHANGE_PIN_SUCCESS'
export const CHANGE_PIN_ERROR = 'USER::CHANGE_PIN_ERROR'

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: {
      username: username,
      password: password,
    },
  }
}

export const changeOutlet = (outlet) => {
  return {
    type: CHANGE_OUTLET,
    payload: {
      selectedOutlet: outlet,
    },
  }
}

export const changePin = (oldPin, newPin, newPinConfirmation) => {
  return {
    type: CHANGE_PIN,
    payload: {
      oldPin,
      newPin,
      newPinConfirmation,
    },
  }
}

export const logout = (message, onOkAction) => {
  return {
    type: LOGOUT,
    payload: {
      message,
      onOkAction,
    },
  }
}

export const getOutlets = () => {
  return {
    type: GET_OUTLETS,
  }
}
