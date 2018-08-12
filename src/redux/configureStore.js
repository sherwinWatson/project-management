import { Text, Platform, NativeModules } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'
import sagas from './sagas'
import IS_DEBUG from './../../App'

export const IS_WEB = false

const persistConfig = {
  key: 'users',
  storage,
  whitelist: ['user'],
}

export default (Router, onComplete) => {
  let composeEnhancers

  if (IS_DEBUG) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
    // GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData
  } else {
    composeEnhancers = compose
  }

  let mobileReducers = {}
  if (!!Router && !IS_WEB) {
    const authenticatedReducer = (state, action) => {
      const newState = Router.AuthenticatedNavigator.router.getStateForAction(action, state)
      return newState ? newState : state
    }

    const unAuthenticatedReducer = (state, action) => {
      const newState = Router.UnAuthenticatedNavigator.router.getStateForAction(action, state)
      return newState ? newState : state
    }

    mobileReducers = {
      authenticatedNav: authenticatedReducer,
      unAuthenticatedNav: unAuthenticatedReducer,
    }
  }

  const appReducers = combineReducers({
    ...reducers,
    ...mobileReducers,
  })

  const persistedReducer = persistReducer(persistConfig, appReducers)
  const sagasMiddleware = createSagaMiddleware()
  const middlewares = applyMiddleware(sagasMiddleware)
  const enhancers = composeEnhancers(middlewares)
  const store = createStore(persistedReducer, enhancers)
  const persistor = persistStore(store)

  sagasMiddleware.run(sagas)

  return { store, persistor }
}
