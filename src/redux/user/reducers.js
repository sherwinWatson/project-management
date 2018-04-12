import {
  handleRequestReducer,
  handleRequestErrorReducer,
  handleRequestSuccessReducer,
} from './../../helpers/reducers'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GET_ME_SUCCESS,
  GET_ME_ERROR,
  CHANGE_PIN,
  CHANGE_PIN_SUCCESS,
  CHANGE_PIN_ERROR, REMOVE_ERROR, SIGNUP, SIGNUP_SUCCESS, SIGNUP_ERROR,
} from './actions'

const initialState = {
  login: {
    result: {
      data: {
        token: null,
      },
    },
    refreshing: false,
    error: null,
  },
  me: {
    result: {
      data: {},
    },
    outlets: null,
    selectedOutlet: null,
    refreshing: false,
    error: null,
  },
  changePin: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  logout: {},
  signup: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return handleRequestReducer(state, action, 'login')

    case LOGOUT:
      const {message, onOkAction} = action.payload
      return {
        ...state,
        login: initialState.login,
        me: initialState.me,
        logout: {
          ...state.logout,
          message,
          action: onOkAction,
          createdAt: new Date(),
        },
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          result: {
            data: action.payload,
          },
          refreshing: false,
          error: null,
        },
        me: {
          ...state.me,
          refreshing: true,
        },
        logout: initialState.logout,
      }

    case LOGIN_ERROR:
      return handleRequestErrorReducer(state, action, 'login')

    case GET_ME_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'me')

    case GET_ME_ERROR:
      let prevState = {
        ...state,
        login: {...initialState.login},
      }
      return handleRequestErrorReducer(prevState, action, 'me')

    case SIGNUP:
      return handleRequestReducer(state, action, 'signup')

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          result: {
            data: 'ok',
          },
          refreshing: false,
        },
      }

    case SIGNUP_ERROR:
      return handleRequestErrorReducer(state, action, 'signup')

    case CHANGE_PIN:
      const changePin = handleRequestReducer(state, action, 'changePin')
      return {
        ...changePin,
        changePin: {
          ...changePin.changePin,
          isUpdate: false,
        },
      }

    case CHANGE_PIN_SUCCESS:
      const changePinSuccess = handleRequestSuccessReducer(state, action, 'changePin')
      return {
        ...changePinSuccess,
        changePin: {
          ...changePinSuccess.changePin,
          isUpdate: true,
        },
      }

    case CHANGE_PIN_ERROR:
      return handleRequestErrorReducer(state, action, 'changePin')

    case REMOVE_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
        },
      }

    default:
      return state
  }
}
