import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { selectToken, selectUser } from './../redux/user/selectors'
import {BackHandler} from 'react-native'
import {axiosInit} from '../config/axios'

class Main extends React.Component {
  constructor(props) {
    super(props)
    const { token } = props
    axiosInit(token)
  }

  _onBackPress() {
    const { isLoggedIn, authenticatedNav, unAuthenticatedNav } = this.props
    const nav = isLoggedIn ? authenticatedNav : unAuthenticatedNav
    const authCanPop = isLoggedIn && (nav.index > 0)
    const unAuthCanPop = !isLoggedIn && nav.index > 0
    if (authCanPop || unAuthCanPop) {
      this.props.dispatch(NavigationActions.back({ key: null }))
      return true
    }
    return false
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this._onBackPress())
  }

  componentWillUpdate(nextProps, nextState) {
    const { token } = this.props
    if (nextProps.token && (token !== nextProps.token)) {
      axiosInit(nextProps.token)
    }
  }

  render() {
    const { router: Router, isLoggedIn, user } = this.props
    const AuthenticatedNavigator = Router.AuthenticatedNavigator
    const UnAuthenticatedNavigator = Router.UnAuthenticatedNavigator

    if (isLoggedIn) {
      return (
        <AuthenticatedNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.authenticatedNav,
          })}
        />
      )
    }

    return (
      <UnAuthenticatedNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.unAuthenticatedNav })}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  unAuthenticatedNav: state.unAuthenticatedNav,
  authenticatedNav: state.authenticatedNav,
  isLoggedIn: selectUser(state).user_id,
  user: selectUser(state),
  token: selectToken(state),
})

export default connect(
  mapStateToProps,
)(Main)
