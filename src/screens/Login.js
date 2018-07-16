import React from 'react'
import { connect } from 'react-redux'
import { View, Image, TextInput } from 'react-native'
import { StyleProvider, Container, Content, Form, Item, Label, InputGroup, Input, Button, Text } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin, { screen } from './../styles/margin'
import LoadingView from './../components/LoadingView'
import { selectLoginRefreshing, selectMeError, selectLoginError } from './../redux/user/selectors'
import DialogView from './../components/DialogView'

import { login, removeError } from './../redux/user/actions'
import IconPerson from '../img/IconPerson'
import IconLock from '../img/IconLock'

const styles = {
  input: {
    backgroundColor: color.darkText,
    borderRadius: 30,
    paddingHorizontal: margin.s24,
    marginTop: margin.s24,
  },
  textInput: {
    marginLeft: margin.s12,
    flex: 1,
    color: color.lightText,
  },
  button: {
    backgroundColor: color.space_grey,
    borderRadius: 30,
    paddingHorizontal: margin.s24,
    marginTop: margin.s48,
  },
}

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: 'Alpin123',
      password: '123456',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, meError, logout, doRemoveError } = this.props

    if (nextProps.error !== error) {
      // if (nextProps.error && nextProps.error.message) {
      if (nextProps.error) {
        this.dialog._show('Login Error', 'Username atau password salah', doRemoveError())
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
    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: 'black'}}>
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <LoadingView isShown={isLoading} noBack isModal={false} />
          <Content padder contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always' >
            <View>
              <Image
                style={{alignSelf: 'center', marginTop: 80, marginBottom: 30, width: 80, height: 120}}
                source={require('./../img/kamiLogo.png')}
              />
              <Item style={styles.input}>
                <IconPerson color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
                  autoFocus={false}
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this._passwordView.focus()
                  }}
                  onChangeText={(value) => this.setState({username: value})}
                  placeholder='Username'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={this.state.username}
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                />
              </Item>

              <Item style={styles.input}>
                <IconLock color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
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
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                />
              </Item>

              <Button block style={styles.button} onPress={() => doLogin(this.state.username, this.state.password)}>
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
  doRemoveError() {
    dispatch(removeError())
  },
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Login)
