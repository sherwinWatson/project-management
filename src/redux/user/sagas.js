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
  CHANGE_PIN_ERROR,
} from './actions'

export function* login(action) {
  try {
    const response = yield axios({
      url: 'login',
      method: 'post',
      data: {
        _username: action.payload.username,
        // _username: 'admin',
        _password: action.payload.password,
        // _password: 'password',
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
      url: 'me/',
      method: 'get',
    })

    yield put({ type: GET_ME_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_ME_ERROR, error})
  }
}

export function* getOutlets() {
  try {
    const response = yield axios({
      url: 'outletapi/me/outlets',
      method: 'get',
    })
    yield put({ type: GET_OUTLETS_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_OUTLETS_ERROR, error})
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

export function* watchUser() {
  yield takeEvery(LOGIN, login)
  yield takeEvery(CHANGE_PIN, changePin)
  yield takeEvery(LOGIN_SUCCESS, getMe)
  yield takeEvery(GET_OUTLETS, getOutlets)
}
