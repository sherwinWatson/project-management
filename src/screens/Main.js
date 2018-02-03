import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { selectToken, selectUser } from './../redux/user/selectors'

class Main extends React.Component {
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
  isLoggedIn: selectUser(state).id,
  user: selectUser(state),
  // token: selectToken(state),
})

export default connect(
  mapStateToProps,
)(Main)
