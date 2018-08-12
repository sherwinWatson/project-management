import React from 'react'
import { connect } from 'react-redux'
import {Button, Icon} from 'native-base'
import {logout} from '../redux/user/actions'
import color from '../styles/color'

class MainTabsRightButton extends React.Component {
  render() {
    return (
      <Button transparent onPress={() => this.props.dispatchLogout()}>
        <Icon style={{ color: color.toolbarItem }} name="log-out" />
      </Button>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  dispatchLogout() {
    dispatch(logout())
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(MainTabsRightButton)
