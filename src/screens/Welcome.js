import React from 'react'
import { connect } from 'react-redux'
import { View, StyleProvider, Container, Button, Text, Spinner } from 'native-base'
import { Image } from 'react-native'
import theme from './../styles/theme'
import color from './../styles/color'
import margin, { screen } from './../styles/margin'

const styles = {
  button: {
    backgroundColor: color.darkText,
    flex: 1,
    borderRadius: 0,
  },
  separator: {
    backgroundColor: color.white,
    width: 2,
  },
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    color: color.white,
    marginHorizontal: margin.s12,
  },
  text: {
    fontSize: 20,
    color: color.white,
    marginHorizontal: margin.s12,
    marginTop: margin.s24,
    marginBottom: margin.s48,
  },
}

class Welcome extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const {
      navigation
    } = this.props

    const openLogin = _.throttle((navigationn) => {
      navigationn.navigate('Login')
    }, 1200, {trailing: false})

    return (
      <StyleProvider style={theme}>
        <Container style={{flexGrow: 1}}>
          <Image
            source={require('./../img/a35c42e7-b0d1-48b4-8bcf-6d94376c738a.jpg')}
            style={{flex: 1, position: 'absolute', width: screen.width, height: screen.height}}
          />
          <View
            style={{flex: 1, position: 'absolute', width: screen.width, height: screen.height, backgroundColor: '#0000006C'}}
          />
          <View  style={{flexGrow: 1}}/>
          <Text style={styles.heading}>SOLUSI BAGI PARA PROFFESIONAL</Text>
          <Text style={styles.text}>Bangun tim anda sendiri hanya dengan sekali klik menghemat biaya gaji karyawan dan kantor</Text>
          <View style={{flexDirection: 'row', backgroundColor: '#ACBCBF'}}>
            <Button block style={styles.button} onPress={() => openLogin(navigation)}>
              <Text>Login</Text>
            </Button>
            <View style={styles.separator}/>
            <Button block style={styles.button}>
              <Text>Sign Up</Text>
            </Button>
          </View>
        </Container>
      </StyleProvider>
    )
  }
}

export default connect(
  null,
  null,
)(Welcome)
