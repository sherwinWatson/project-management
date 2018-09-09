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
import DialogView from './../components/DialogView'
import {addStoryboardDetail} from '../redux/storyboard/actions'

class NewSection extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      datePickerVisible: false,
      title: '',
      description: '',
      targetDate: moment(),
      selectedDate: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, isRefreshing, navigation } = this.props

    if (nextProps.error !== error) {
      // if (nextProps.error && nextProps.error.message) {
      if (nextProps.error) {
        this.dialog._show('Add Storyboard Detail Error', nextProps.error.message)
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
        textAlignVertical: 'top',
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
      dispatchAddStoryboardDetail,
      navigation,
      isRefreshing,
    } = this.props

    const {
      title,
      description,
      targetDate,
    } = this.state

    const {id} =  navigation.state.params

    const handleButtonFinish = () => {
      dispatchAddStoryboardDetail(id, title, description, targetDate)
    }

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
            <View padder>
              <Item style={styles.input}>
                <TextInput
                  autoFocus={false}
                  blurOnSubmit={false}
                  placeholder='Judul'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={title}
                  style={styles.textInput}
                  underlineColorAndroid='transparent'
                  onChangeText={(value) => this.setState({title: value})}
                />
              </Item>
              <View style={styles.descriptionInput}>
                <TextInput
                  autoFocus={false}
                  blurOnSubmit={false}
                  placeholder='Deskripsi'
                  placeholderTextColor={color.lightText}
                  returnKeyType = {'next'}
                  value={description}
                  style={styles.textInput}
                  underlineColorAndroid='transparent'
                  multiline={true}
                  onChangeText={(value) => this.setState({description: value})}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={{}}>Tanggal Target</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => {
                  this.setState({
                    datePickerVisible: true,
                    selectedDate: 1,
                  })
                }}>
                  <Text>{targetDate.format('DD MMM YYYY')}</Text>
                  <IconDropdown color={color.space_grey}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => handleButtonFinish()}
                disabled={this.state.title === ''}>
                <Text style={{color: this.state.title !== '' ? color.green : color.defaultText}}>FINISH</Text>
              </Button>
            </View>
            {this.state.datePickerVisible &&
            <CalendarPicker
              onDateChange={(date) => {
                this.setState({
                  targetDate: date,
                  datePickerVisible: false,
                })
              }}
              minDate={this.state.selectedDate !== 1 ? moment(this.state.targetDate.toISOString()) : moment()}
            />
            }
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isRefreshing: state.storyboard.addStoryboardDetails.refreshing,
  done: state.storyboard.addStoryboardDetails.result.data,
  error: state.storyboard.addStoryboardDetails.error,
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddStoryboardDetail(storyboardId, subject, description, targetDate) {
    dispatch(addStoryboardDetail(storyboardId, subject, description, targetDate))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewSection)
