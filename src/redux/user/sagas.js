import { put, takeEvery, takeLatest, call } from 'redux-saga/effects'
import axios from 'axios'
import qs from 'qs'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_ME_SUCCESS,
  GET_ME_ERROR,
  GET_OUTLETS,
  GET_OUTLETS_SUCCESS,
  GET_OUTLETS_ERROR,
  LOGOUT,
  CHANGE_PIN,
  CHANGE_PIN_SUCCESS,
  CHANGE_PIN_ERROR, SIGNUP, SIGNUP_ERROR, SIGNUP_SUCCESS,
} from './actions'

export function* login(action) {
  try {
    const response = yield axios({
      url: 'authenticate',
      method: 'post',
      data: {
        username: action.payload.username,
        password: action.payload.password,
      },
    })
    yield put({ type: LOGIN_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error })
  }
}

export function* getMe(action) {
  try {
    const response = yield axios({
      url: 'profile',
      method: 'get',
    })

    yield put({ type: GET_ME_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_ME_ERROR, error})
  }
}

export function* changePin(action) {
  try {
    const {oldPin, newPin, newPinConfirmation} = action.payload
    const response = yield axios({
      method: 'put',
      url: '/me/password',
      data: qs.stringify({
        'paprika_change_password[current_password]': oldPin,
        'paprika_change_password[plainPassword][first]': newPin,
        'paprika_change_password[plainPassword][second]': newPinConfirmation,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    yield put({ type: CHANGE_PIN_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: CHANGE_PIN_ERROR, error})
  }
}

export function* signup(action) {
  try {
    const {username, password, email, phone, firstName, lastName, profession} = action.payload
    const response = yield axios({
      method: 'post',
      url: 'register',
      data: {
        username,
        password,
        email,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        profession,
      },
    })
    yield put({type: SIGNUP_SUCCESS})
  } catch (error) {
    yield put({type: SIGNUP_ERROR, error})
  }
}

export function* watchUser() {
  yield takeEvery(LOGIN, login)
  yield takeEvery(CHANGE_PIN, changePin)
  yield takeEvery(LOGIN_SUCCESS, getMe)
  yield takeEvery(SIGNUP, signup)
}
