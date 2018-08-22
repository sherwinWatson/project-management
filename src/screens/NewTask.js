import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, DatePicker, Picker, Icon, List, Thumbnail } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import { addTask, getOneSection } from '../redux/storyboard/actions';
import LoadingView from '../components/LoadingView';
import { Map } from 'immutable'

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      startDate: new Date(),
      finishDate: new Date(),
      status: 'start',
      selectedUsers: Map(),
      member: [],
    }
    this.handleUserSelected.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const { error, task, refreshing, navigation, section } = this.props

    //CEK ERROR AND DISPLAY IT
    if (nextProps.error !== error) {
      if (nextProps.error && nextProps.error.message) {
        if (nextProps.error && nextProps.error.response && nextProps.error.response.data && nextProps.error.response.data.errors) {
          const key = Object.keys(nextProps.error.response.data.errors)[0]; 
          const message = nextProps.error.response.data.errors[key][0];
          Alert.alert( 'Cannot create Task', message)
        } else {
          Alert.alert( 'Cannot create Task', nextProps.error.message)
        }
      }
    }

    if (!nextProps.refreshing && !nextProps.error) {
      // if success
      navigation.goBack(null)
      navigation.state.params.updateTask({ task: nextProps.task  });
    }
  }

  handleUserSelected = (user) => {
    const { selectedUsers } = this.state

    const newerSelectedUsers = 
      selectedUsers.has(user.user_id) ? 
        selectedUsers.delete(user.user_id) :
          selectedUsers.set(user.user_id, user.user_id)

    this.setState({selectedUsers: newerSelectedUsers})

    let selectedToArray = []
    newerSelectedUsers.map((item, i) => {
        selectedToArray.push({user_id: i, key: i})
      }
    )
    this.setState({member: selectedToArray})
  }

  render() {
    const { navigation, dispatchAddTask, task, error, refreshing } = this.props
    const { sectionId, sectionUsers } = navigation.state.params    
    const { containerStyle, formStyle, listItemStyle, userStyles, footerMenuStyle, thumbnailStyle, listSelectedStyle }  = styles
    const { name, startDate, finishDate, status, selectedUsers, member } = this.state

    const getThumbnail = (item) => {
      return item.imageUrl
        ? { uri: item.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderUser = ({item}) => { 
      return (
        <TouchableOpacity 
          key={item.user_id}
          style={listSelectedStyle}
          onPress={() => {
            this.handleUserSelected(item)
          }
        }>
          {/* <Thumbnail style={thumbnailStyle} source={getThumbnail(item)} />
          <Text style={userStyles}>{item.name}</Text>
          { selectedUsers.has(item.user_id) ? <Icon name="md-checkmark" style={{color: color.green, fontSize: 16}}/> : <Text /> } */}
        </TouchableOpacity>
      )
    }

    const renderMultiSelectList = () => {

      _keyExtractor = (item, index) => item.id

      return (
        <FlatList
          data={sectionUsers}
          extraData={selectedUsers}
          renderItem={renderUser}
          keyExtractor={_keyExtractor}
        />
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container style={containerStyle}>
          <LoadingView isShown={refreshing} noBack isModal={false} />
          <Content contentContainerStyle={{ flexGrow: 1 }} >
            <Form style={formStyle}>
              
              <View style={listItemStyle}>
                <Label>Task Name</Label>
                <Input style={{fontSize: 18}} value={name} onChangeText={(name) => this.setState({name})}/>
              </View>

              <View style={listItemStyle}>
                <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Label>Start Date</Label>
                  <DatePicker
                    defaultDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText='choose date...'
                    textStyle={{ color: color.black, fontSize: 18 }}
                    style={{flex: 1}}
                    placeHolderTextStyle={{ color: color.light_grey, fontSize: 18 }}
                    onDateChange={startDate => this.setState({startDate})}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Label>Finish Date</Label>
                  <DatePicker
                    defaultDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                      placeHolderText='choose date...'
                    textStyle={{ color: color.black, fontSize: 18 }}
                    style={{flex: 1}}
                    placeHolderTextStyle={{ color: color.light_grey, fontSize: 18 }}
                    onDateChange={finishDate => this.setState({finishDate})}
                  />
                </View>
              </View>
              </View>

              <View style={listItemStyle}>
                <Label>Status</Label>
                <Picker
                  mode="dropdown"
                  iosHeader="pilih jenis kelamin"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  selectedValue={status}
                  onValueChange={status => this.setState({status})}
                >
                  <Picker.Item label="START" value="start" />
                  <Picker.Item label="INPROGRESS" value="inprogress" />
                  <Picker.Item label="DONE" value="done" />
                </Picker>
              </View>

              <View style={{margin: margin.s16}}>
                <Label>Choose Person</Label>
                { renderMultiSelectList() }
              </View>
            </Form>

            <View style={footerMenuStyle}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{fontSize: 18, color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => dispatchAddTask(sectionId, name, startDate, finishDate, status, member) }>
                <Text style={{fontSize: 18, color: color.green}}>FINISH</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: color.white,
  },
  formStyle: {
    marginHorizontal: margin.s12
  },
  userStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    margin: margin.s16,
    flex: 1
  },
  listItemStyle: {
    borderBottomWidth: 1, 
    borderColor: color.border, 
    marginHorizontal: margin.s16,
    marginVertical: margin.s8, 
    height: 80
  },
  footerMenuStyle:{
    margin: margin.s16, 
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  listSelectedStyle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: margin.s8
  },
  thumbnailStyle: {
    width: 50, 
    height: 50, 
    margin: margin.s4
  },
};

const mapStateToProps = (state) => ({
  task: state.storyboard.addTask.result.data,
  refreshing: state.storyboard.addTask.refreshing,
  error: state.storyboard.addTask.error,
  section: state.storyboard.getOneSection.result.data,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddTask(sectionId, name, startDate, finishDate, status, member) {
    dispatch(addTask(sectionId, name, startDate, finishDate, status, member))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);