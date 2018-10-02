import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, Picker, Icon, List, Thumbnail, ListItem, Left, Body, Spinner } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import { addTask, getOneSection, getUserTask, modifyTask } from '../redux/storyboard/actions';
import LoadingView from '../components/LoadingView';
import { Map } from 'immutable'
import CalendarPicker from 'react-native-calendar-picker';
import IconDropdown from '../img/IconDropdown'
import DialogView from './../components/DialogView'
import IconClose from '../img/IconClose';

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      datePickerVisible: false,
      selectedDate: 1,
      id: '',
      name: '',
      startDate: moment(),
      finishDate: moment().add(1, 'month'),
      status: 'start',
      selectedUsers: Map(), 
      member: [],
    }
    this.handleUserSelected.bind(this)
  }

  componentWillMount(){
    const { task, sectionUsers } = this.props.navigation.state.params ? this.props.navigation.state.params : { task: null, users: [] }
      
    if (task) {
      this.setState({ 
        id: task.task_id,
        name: task.name, 
        startDate: moment(task.start_date),
        finishDate: moment(task.finish_date),
        status: task.status,
        availableUser: sectionUsers
      });

      //GET USER TASK 
      this.props.dispatchGetUserTask(task.task_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, task, refreshing, navigation, section, userTask, userTaskError, userTaskRefreshing, modifyTask, modifyTaskError, modifyTaskRefreshing } = this.props
    const { selectedUsers } = this.state

    // HANDLE ADD TASK
    //CEK ERROR AND DISPLAY IT
    if (nextProps.error !== error) {
      if (nextProps.error && nextProps.error.message) {
        if (nextProps.error.response && nextProps.error.response.data && nextProps.error.response.data.errors) {
          const key = Object.keys(nextProps.error.response.data.errors)[0];
          const message = nextProps.error.response.data.errors[key][0];
          Alert.alert( 'Cannot create Task', message)
        } else {
          Alert.alert( 'Cannot create Task', nextProps.error.message)
        }
      }
    }

    if (nextProps.task != task) {
      if (!nextProps.refreshing && !nextProps.error) {
        // if success
        navigation.goBack(null)
        navigation.state.params.updateTask({ task: nextProps.task  });
      }
    }

    //HANDLE TASK USER
    if (nextProps.userTask != userTask) {
      if (!nextProps.userTaskRefreshing && !nextProps.userTaskError) { 
        nextProps.userTask.map((user, index) => { 
          this.handleUserSelected(user);
        });
      }
    }

    // HANDLE UPDATE TASK
    //CEK ERROR AND DISPLAY IT
    if (nextProps.modifyTaskError !== modifyTask) {
      if (nextProps.modifyTaskError && nextProps.modifyTaskError.message) {
        if (nextProps.modifyTaskError.response && nextProps.modifyTaskError.response.data && nextProps.modifyTaskError.response.data.errors) {
          const key = Object.keys(nextProps.modifyTaskError.response.data.errors)[0];
          const message = nextProps.modifyTaskError.response.data.errors[key][0];
          Alert.alert( 'Cannot create Task', message)
        } else {
          Alert.alert( 'Cannot create Task', nextProps.modifyTaskError.message)
        }
      }
    }

    if (nextProps.modifyTask != modifyTask) {
      if (!nextProps.modifyTaskRefreshing && !nextProps.modifyTaskError) { // if success
        navigation.goBack(null)
        navigation.state.params.refreshTask();
      }
    }
  }

  handleUserSelected = (user) => { 
    const { selectedUsers } = this.state 
 
    const newerSelectedUsers = 
      selectedUsers.has(user.user_id) ? 
        selectedUsers.delete(user.user_id) : 
          selectedUsers.set(user.user_id, user);
 
    this.setState({selectedUsers: newerSelectedUsers}) 
 
    let selectedToArray = [] 
    newerSelectedUsers.map((item) => { 
        selectedToArray.push(item) 
      } 
    ) 
    
    this.setState({member: selectedToArray}) 
  } 

  render() {
    const { navigation, dispatchAddTask, dispatchModifyTask, task, error, refreshing, userTask, userTaskRefreshing, userTaskError, modifyTask, modifyTaskError, modifyTaskRefreshing } = this.props
    const { sectionId, sectionUsers } = navigation.state.params
    const { containerStyle, formStyle, listItemStyle, listStyle, userStyles, footerMenuStyle, thumbnailStyle, listSelectedStyle, labelStyle }  = styles
    const { id, name, startDate, finishDate, status, selectedUsers, member, selectedDate, datePickerVisible } = this.state

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
          <Thumbnail style={thumbnailStyle} source={getThumbnail(item)} /> 
          <Text style={userStyles}>{item.name}</Text> 
          { selectedUsers.has(item.user_id) ? <Icon name="md-checkmark" style={{color: color.green, fontSize: 16}}/> : <Text /> } 
        </TouchableOpacity> 
      )
    }

    const renderMultiSelectList = () => { 
      _keyExtractor = (item, index) => item.user_id 
      if (userTaskRefreshing) {
        return <Spinner animating={userTaskRefreshing} color={color.light_grey} />
      }
      return ( 
        <FlatList 
          data={sectionUsers} 
          extraData={selectedUsers} 
          renderItem={renderUser} 
          keyExtractor={_keyExtractor} 
        /> 
      ) 
    } 

    const handleButtonFinish = () => { 
      if (moment(startDate.toISOString()).isAfter(moment(finishDate.toISOString()))) {
        this.dialog._show(null, 'Start date must earlier than end date')
      } else { 
        if (!id) {  // INSERT
          dispatchAddTask(sectionId, name, startDate, finishDate, status, member);        
        } else {  // UPDATE
          dispatchModifyTask(id, name, startDate, finishDate, status, member);
        }
      }
    }

    return (
      <StyleProvider style={theme}>
        <Container style={containerStyle}>
          <LoadingView isShown={refreshing || modifyTaskRefreshing} noBack isModal={false} />
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <Content contentContainerStyle={{ flexGrow: 1 }} >
            <Form style={formStyle}>

              <View style={listStyle}>
                <Text>Task Name</Text>
                <Input style={{fontSize: 18}} value={name} onChangeText={(name) => this.setState({name})}/>
              </View>

              <View style={listStyle}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text>Start Date</Text>
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
                    <Text>End Date</Text>
                    <TouchableOpacity style={styles.dateInput} onPress={() => {
                      this.setState({
                        datePickerVisible: true,
                        selectedDate: 2,
                      })
                    }}>
                      <Text>{finishDate.format('DD MMM YYYY')}</Text>
                      <IconDropdown color={color.space_grey}/>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>

              <View style={listItemStyle}>
                <Text>Status</Text>
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
                <Text>Choose Person</Text>
                { renderMultiSelectList() }
                {/* {renderSelectedUser()}
                {renderContentUser()} */}
              </View>
            </Form>

            <View style={footerMenuStyle}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{fontSize: 18, color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => handleButtonFinish() }>
                <Text style={{fontSize: 18, color: color.green}}>FINISH</Text>
              </Button>
            </View>
            
            {
              datePickerVisible &&
              <CalendarPicker
                onDateChange={(date) => {
                  if (selectedDate === 1) {
                    this.setState({
                      startDate: date,
                      datePickerVisible: false,
                    })
                  } else {
                    this.setState({
                      finishDate: date,
                      datePickerVisible: false,
                    })
                  }
                }}
                minDate={selectedDate !== 1 ? moment(startDate.toISOString()) : moment()}
              />
            }

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
  listStyle: {
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
  dateInput: {
    paddingHorizontal: margin.s8,
    marginTop: margin.s8,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: margin.s8,
    borderColor: color.green,
    flexDirection: 'row',
  },
  labelStyle: {
    color: color.green,
  },
};

const mapStateToProps = (state) => ({
  task: state.storyboard.addTask.result.data,
  refreshing: state.storyboard.addTask.refreshing,
  error: state.storyboard.addTask.error,
  section: state.storyboard.getOneSection.result.data,
  userTask: state.storyboard.userTask.result.data,
  userTaskRefreshing: state.storyboard.userTask.refreshing,
  userTaskError: state.storyboard.userTask.error,
  modifyTask: state.storyboard.modifyTask.result.data,
  modifyTaskRefreshing: state.storyboard.modifyTask.refreshing,
  modifyTaskError: state.storyboard.modifyTask.error,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddTask(sectionId, name, startDate, finishDate, status, member) {
    dispatch(addTask(sectionId, name, startDate, finishDate, status, member))
  },
  dispatchModifyTask(taskId, name, startDate, finishDate, status, member) {
    dispatch(modifyTask(taskId, name, startDate, finishDate, status, member))
  },
  dispatchGetUserTask(taskId) {
    dispatch(getUserTask(taskId))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);