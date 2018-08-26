import React from 'react'
import { connect } from 'react-redux'
import QRCodeView from 'react-native-qrcode-svg'
import margin, { screen } from './../styles/margin'
import theme from '../styles/theme'
import {Container, StyleProvider} from 'native-base'
import color from '../styles/color'
import {headerConfig} from '../config/headerConfig'
import {selectUser} from '../redux/user/selectors'

class QRCode extends React.Component {
  static navigationOptions = headerConfig('QR Code', true)

  render() {
    return (
      <StyleProvider style={theme}>
        <Container style={{justifyContent: 'center', alignItems: 'center'}}>
          <QRCodeView
            value={this.props.user.user_id}
            size={screen.width - 50}
          />
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
})

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRCode)
