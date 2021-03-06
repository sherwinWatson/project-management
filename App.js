 
import React, { Component } from 'react'
import Main from './src/screens/Main'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import Router from './src/router'
import { PersistGate } from 'redux-persist/integration/react'
 
// export const IS_DEBUG = Platform.OS === 'ios' ? process.env.NODE_ENV === 'development' :  NativeModules.RNConfig.BUILD_ENV === 'development'
export const IS_DEBUG = true
 
export default class App extends Component<{}> {
  constructor() {
    super()
    this.state = {
      storeLoaded: false,
      store: configureStore(Router, () => { this.setState({ storeLoaded: true }) }),
      notification: null,
    }
  }
 
  render() {
    return (
      <Provider store={this.state.store.store}>
        <PersistGate loading={null} persistor={this.state.store.persistor}>
          <Main router={Router}/>
        </PersistGate>
      </Provider>
    )
  }
}