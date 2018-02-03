import React from 'react'
import { connect } from 'react-redux'
import { View, Alert, InteractionManager } from 'react-native'
import { StyleProvider, Container, Content, Form, Item, Label, InputGroup, Input, Button, Text } from 'native-base'
import theme from './styles/theme'
import color from './styles/color'
import margin, { screen } from './styles/margin'
import LoadingView from './components/LoadingView'
import { selectLoginRefreshing, selectMeError, selectLoginError } from './redux/user/selectors'
import DialogView from './components/DialogView'

import { login } from './redux/user/actions'

class Login extends React.Component {
  // static navigationOptions = {
  //   ...headerConfig(),
  //   header: null,
  // }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, meError, logout } = this.props

    if (nextProps.error !== error) {
      if (nextProps.error && nextProps.error.message) {
        this.dialog._show('Login Error', nextProps.error.message)
      }
    }

    if (nextProps.meError !== meError) {
      if (nextProps.meError && nextProps.meError.message) {
        this.dialog._show(null, nextProps.meError.message)
      }
    }

    if (nextProps.logout !== logout) {
      if (nextProps.logout.message) {
        this.dialog._show(null, nextProps.logout.message, nextProps.logout.action)
      }
    }
  }

  render() {
    const { doLogin, isLoading } = this.props
    const labelWidth = screen.width * 2 / 3
    const labelHeight = labelWidth * 3 / 10
    return (
      <StyleProvider style={theme}>
        <Container>
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <LoadingView isShown={isLoading} noBack />
          <Content padder contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always' >
            <View>
              <Item>
                <Input
                  autoFocus={true}
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this._passwordView._root.focus()
                  }}
                  onChangeText={(value) => this.setState({username: value})}
                  placeholder='Username'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={this.state.username}
                />
              </Item>

              <Item style={{marginTop: margin.s16, marginBottom: margin.s4}}>
                <Input
                  placeholder='Password'
                  placeholderTextColor={color.lightText}
                  onSubmitEditing={(event) => {
                    doLogin(this.state.username, this.state.password)
                  }}
                  onChangeText={(value) => this.setState({password: value})}
                  ref={(ref) => {this._passwordView = ref}}
                  returnKeyType = {'done'}
                  secureTextEntry
                  value={this.state.password}
                />
              </Item>

              <Button block style={{ marginTop: margin.s16 }} onPress={() => doLogin(this.state.username, this.state.password)}>
                <Text>Login</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: selectLoginRefreshing(state),
  error: selectLoginError(state),
  meError: selectMeError(state),
  logout: state.user.logout,
})
const mapDispatchToProps = (dispatch) => ({
  doLogin(username, password) {
    dispatch(login(username, password))
  },
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Login)
