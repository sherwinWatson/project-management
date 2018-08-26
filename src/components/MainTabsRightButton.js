import React from 'react'
import { connect } from 'react-redux'
import {Button, Icon, View} from 'native-base'
import {logout} from '../redux/user/actions'
import color from '../styles/color'

class MainTabsRightButton extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button transparent onPress={() => this.props.navigation.navigate('QRCode')}>
          <Icon style={{ color: color.toolbarItem }} name="barcode" />
        </Button>
        <Button transparent onPress={() => this.props.dispatchLogout()}>
          <Icon style={{ color: color.toolbarItem }} name="log-out" />
        </Button>
      </View>
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
