import React from 'react'
import { connect } from 'react-redux'
import theme from '../styles/theme'
import color from '../styles/color'
import { View, StyleProvider, Container, Content, Item, Text, Button, Icon } from 'native-base'
import {TextInput, TouchableOpacity, Image, Platform} from 'react-native'
import LoadingView from './../components/LoadingView'
import margin, {screen} from '../styles/margin'
import moment from 'moment'
import IconDropdown from '../img/IconDropdown'
import CalendarPicker from 'react-native-calendar-picker'

class NewProject extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      datePickerVisible: false,
      title: '',
      description: '',
      startDate: moment().format('DD MMM YYYY'),
      endDate: moment().add(1, 'month').format('DD MMM YYYY'),
      selectedDate: 1,
    }
  }

  render() {
    const styles = {
      input: {
        paddingHorizontal: margin.s4,
        borderBottomColor: color.green,
        borderBottomWidth: 1,
      },
      descriptionInput: {
        paddingHorizontal: margin.s8,
        marginTop: margin.s24,
        borderWidth: 1,
        borderRadius: 5,
        height: 180,
        borderColor: color.space_grey,
      },
      dateInput: {
        paddingHorizontal: margin.s8,
        marginTop: margin.s8,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: margin.s8,
        borderColor: color.green,
        flexDirection: 'row',
      },
      textInput: {
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

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={false} solid />
          <Content contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
            <Button
              transparent onPress={() => this.props.navigation.goBack(null)}
              style={{position: 'absolute', zIndex: 8}}>
              <Icon style={{ color: color.toolbarItem }} name="ios-arrow-back" />
            </Button>
            <Image
              source={require('./../img/aad705dd-889c-47df-8934-4725d75cfbaa.jpg')}
              style={{width: screen.width, height: 200}}
            />
            <View padder>
              <Item style={styles.input}>
                <TextInput
                  autoFocus={true}
                  blurOnSubmit={false}
                  placeholder='Ketik subjek grup'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  style={styles.textInput}
                  underlineColorAndroid='transparent'
                />
              </Item>
              <View style={styles.descriptionInput}>
                <TextInput
                  autoFocus={false}
                  blurOnSubmit={false}
                  placeholder='Deskripsi grup anda disini'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  style={styles.textInput}
                  underlineColorAndroid='transparent'
                  multiline={true}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: margin.s24}}>
                <View style={{flex: 1}}>
                  <Text style={{}}>Tanggal Mulai</Text>
                  <TouchableOpacity style={styles.dateInput} onPress={() => {
                    this.setState({
                      datePickerVisible: true,
                      selectedDate: 1,
                    })
                  }}>
                    <Text>{this.state.startDate}</Text>
                    <IconDropdown color={color.space_grey}/>
                  </TouchableOpacity>
                </View>
                <View style={{width: margin.s8}}/>
                <View style={{ flex: 1 }}>
                  <Text style={{}}>Tanggal Selesai</Text>
                  <TouchableOpacity style={styles.dateInput} onPress={() => {
                    this.setState({
                      datePickerVisible: true,
                      selectedDate: 2,
                    })
                  }}>
                    <Text>{this.state.endDate}</Text>
                    <IconDropdown color={color.space_grey}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {this.state.datePickerVisible &&
            <CalendarPicker
              onDateChange={(date) => {
                if (this.state.selectedDate === 1) {
                  this.setState({
                    startDate: date.format('DD MMM YYYY'),
                    datePickerVisible: false,
                  })
                } else {
                  this.setState({
                    endDate: date.format('DD MMM YYYY'),
                    datePickerVisible: false,
                  })
                }
              }}
            />
            }
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProject)
