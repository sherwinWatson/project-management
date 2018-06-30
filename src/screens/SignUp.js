import React from 'react'
import { connect } from 'react-redux'
import { View, Image, TextInput, Alert, BackHandler } from 'react-native'
import { StyleProvider, Container, Content, Form, Item, Label, InputGroup, Input, Button, Text } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin, { screen } from './../styles/margin'
import LoadingView from './../components/LoadingView'
import DialogView from './../components/DialogView'

import { login, signup } from './../redux/user/actions'
import IconPerson from '../img/IconPerson'
import IconLock from '../img/IconLock'
import IconPhone from '../img/IconPhone'
import IconEmail from '../img/IconEmail'

const styles = {
  input: {
    backgroundColor: color.darkText,
    borderRadius: 30,
    paddingHorizontal: margin.s24,
    marginTop: margin.s24,
  },
  smallInput: {
    backgroundColor: color.darkText,
    borderRadius: 30,
    paddingHorizontal: margin.s12,
    marginTop: margin.s24,
    flex: 1,
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
  firstRow: {
    flexDirection: 'row',
    flex: 1,
  },
}

class SignUp extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      phone: '',
      email: '',
      profession: '',
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    Alert.alert(
      'Apakah anda yakin?',
      'Data yang telah terisi akan hilang',
      options,
      { cancelable: true }
    )

    return true
  }

  componentWillReceiveProps(nextProps) {
    const { error, signupSuccess, logout, navigation } = this.props
    const openLogin = _.throttle((navigationn) => {

      Alert.alert(
        null,
        'SignUp Berhasil',
        [{text: 'OK', onPress: () => this.props.navigation.goBack(null)}],
        { cancelable: false }
      )
    }, 1200, {trailing: false})

    if (nextProps.error !== error) {
      if (nextProps.error && nextProps.error.message) {
        this.dialog._show('Signup Error', nextProps.error.message)
      }
    }

    if (nextProps.logout !== logout) {
      if (nextProps.logout.message) {
        this.dialog._show(null, nextProps.logout.message, nextProps.logout.action)
      }
    }
    if (nextProps.signupSuccess !== signupSuccess) {
      if (nextProps.signupSuccess === 'ok') {
        openLogin(navigation)
      }
    }
  }

  render() {
    const { doSignup, isLoading } = this.props
    const {username, password, email, phone, firstName, lastName, profession} = this.state
    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: 'black'}}>
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <LoadingView isShown={isLoading} noBack isModal={false} />
          <Content padder contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always' >
            <View>
              <Image
                style={{ marginTop: 5, marginBottom: 0, width: 40, height: 60}}
                source={require('./../img/kamiLogo.png')}
              />

              <View style={styles.firstRow}>
                <Item style={styles.smallInput}>
                  <TextInput
                    autoFocus={true}
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      this._lastNameView.focus()
                    }}
                    onChangeText={(value) => this.setState({firstName: value})}
                    placeholder='First Name'
                    placeholderTextColor={color.lightText}
                    returnKeyType = {'next'}
                    value={firstName}
                    style={styles.textInput}
                    underlineColorAndroid={color.darkText}
                  />
                </Item>

                <View style={{width: margin.s8}}/>

                <Item style={styles.smallInput}>
                  <TextInput
                    blurOnSubmit={false}
                    onSubmitEditing={(event) => {
                      this._usernameView.focus()
                    }}
                    onChangeText={(value) => this.setState({lastName: value})}
                    ref={(ref) => {this._lastNameView = ref}}
                    placeholder='Last Name'
                    placeholderTextColor={color.lightText}
                    returnKeyType = {'next'}
                    value={lastName}
                    style={styles.textInput}
                    underlineColorAndroid={color.darkText}
                  />
                </Item>
              </View>

              <Item style={styles.input}>
                <IconPerson color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this._passwordView.focus()
                  }}
                  onChangeText={(value) => this.setState({username: value})}
                  ref={(ref) => {this._usernameView = ref}}
                  placeholder='Username'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={username}
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
                    this._phoneView.focus()
                  }}
                  onChangeText={(value) => this.setState({password: value})}
                  ref={(ref) => {this._passwordView = ref}}
                  returnKeyType = {'done'}
                  secureTextEntry
                  value={password}
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                />
              </Item>

              <Item style={styles.input}>
                <IconPhone color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this._emailView.focus()
                  }}
                  onChangeText={(value) => this.setState({phone: value})}
                  ref={(ref) => {this._phoneView = ref}}
                  placeholder='Phone Number'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={phone}
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                  keyboardType='phone-pad'
                />
              </Item>

              <Item style={styles.input}>
                <IconEmail color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
                  blurOnSubmit={false}
                  onSubmitEditing={(event) => {
                    this._professionView.focus()
                  }}
                  onChangeText={(value) => this.setState({email: value})}
                  ref={(ref) => {this._emailView = ref}}
                  placeholder='Email'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={email}
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                  keyboardType='email-address'
                />
              </Item>

              <Item style={styles.input}>
                <IconPerson color={color.lightText} width={margin.s16} height={margin.s16} style={{marginLeft: margin.s24}}/>
                <TextInput
                  placeholder='Profession'
                  placeholderTextColor={color.lightText}
                  onSubmitEditing={(event) => {
                    doSignup(username, password, email, phone, firstName, lastName, profession)
                  }}
                  onChangeText={(value) => this.setState({profession: value})}
                  ref={(ref) => {this._professionView = ref}}
                  returnKeyType = {'done'}
                  value={profession}
                  style={styles.textInput}
                  underlineColorAndroid={color.darkText}
                />
              </Item>
              <Button block style={styles.button} onPress={() => {
                doSignup(username, password, email, phone, firstName, lastName, profession)
              }}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.signup.refreshing,
  error: state.user.signup.error,
  signupSuccess: state.user.signup.result.data,
  logout: state.user.logout,
})
const mapDispatchToProps = (dispatch) => ({
  doLogin(username, password) {
    dispatch(login(username, password))
  },
  doSignup(username, password, email, phone, firstName, lastName, profession) {
    dispatch(signup(username, password, email, phone, firstName, lastName, profession))
  },
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(SignUp)
