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
import {addStoryboard} from './../redux/storyboard/actions'
import DialogView from './../components/DialogView'

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
      startDate: moment(),
      endDate: moment().add(1, 'month'),
      selectedDate: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, isRefreshing, navigation } = this.props

    if (nextProps.error !== error) {
      // if (nextProps.error && nextProps.error.message) {
      if (nextProps.error) {
        this.dialog._show('Add Storyboard Error', nextProps.error.message)
      }
    }

    if (!nextProps.isRefreshing && !nextProps.error) {
      navigation.goBack(null)
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

    const {
      dispatchAddStoryboard,
      navigation,
      isRefreshing,
    } = this.props

    const {
      title,
      description,
      startDate,
      endDate,
    } = this.state

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={isRefreshing} noBack isModal={false} />
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <Content contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
            <Button
              transparent onPress={() => navigation.goBack(null)}
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
                  onChangeText={(value) => this.setState({title: value})}
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
                  onChangeText={(value) => this.setState({description: value})}
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
                    <Text>{startDate.format('DD MMM YYYY')}</Text>
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
                    <Text>{endDate.format('DD MMM YYYY')}</Text>
                    <IconDropdown color={color.space_grey}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => {
                  if (moment(this.state.startDate.toISOString()).isAfter(moment(this.state.endDate.toISOString()))) {
                    this.dialog._show(null, 'Start date must earlier than end date')
                  } else {
                    dispatchAddStoryboard(title, description, startDate, endDate)
                  }
                }}
                disabled={this.state.title === ''}>
                <Text style={{color: this.state.title !== '' ? color.green : color.defaultText}}>FINISH</Text>
              </Button>
            </View>
            {this.state.datePickerVisible &&
            <CalendarPicker
              onDateChange={(date) => {
                if (this.state.selectedDate === 1) {
                  this.setState({
                    startDate: date,
                    datePickerVisible: false,
                  })
                } else {
                  this.setState({
                    endDate: date,
                    datePickerVisible: false,
                  })
                }
              }}
              minDate={this.state.selectedDate !== 1 ? moment(this.state.startDate.toISOString()) : moment()}
            />
            }
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isRefreshing: state.storyboard.addStoryboard.refreshing,
  done: state.storyboard.addStoryboard.result.data,
  error: state.storyboard.addStoryboard.error,
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddStoryboard(name, description, startDate, finishDate) {
    dispatch(addStoryboard(name, description, startDate, finishDate))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProject)
