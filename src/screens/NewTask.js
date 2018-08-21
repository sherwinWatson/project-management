import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, DatePicker, Picker, Icon, List, Thumbnail } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { addTask, getOneSection } from '../redux/storyboard/actions';
import LoadingView from '../components/LoadingView';
import { Map } from 'immutable'

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      name: 'Nama Task disini',
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
      // jika berhasil
      console.log('berhasil create task');
      // console.log(section.tasks.data);
      console.log(nextProps.task);
      // section.tasks.data.push(nextProps.task);
      // console.log(section.tasks.data);
      navigation.goBack(null)
      navigation.state.params.updateTask({ task: nextProps.task  });
    }
  }

  handleUserSelected = (user) => {
    const { selectedUsers } = this.state

    console.log('handle user selected')
    console.log(user)
    console.log('handle user selected')
    console.log(selectedUsers)
    console.log(selectedUsers.has(user.user_id))

    const newerSelectedUsers = 
      selectedUsers.has(user.user_id) ? 
        selectedUsers.delete(user.user_id) :
          selectedUsers.set(user.user_id, user.user_id)

    this.setState({selectedUsers: newerSelectedUsers})

    console.log('newerSelectedUsers')
    console.log(newerSelectedUsers)

    let selectedToArray = []
    newerSelectedUsers.map((item, i) => {
        selectedToArray.push({user_id: i})
      }
    )

    console.log('array user terpilih')
    console.log(selectedToArray)
    this.setState({member: selectedToArray})
  }

  render() {
    const { navigation, dispatchAddTask, task, error, refreshing } = this.props
    const { sectionId, sectionUsers } = navigation.state.params    
    const { userStyles }  = styles
    const { name, startDate, finishDate, status, selectedUsers, member } = this.state

    console.log('render new task')
    console.log(selectedUsers)
    console.log(sectionUsers)
    console.log(member)

    const getThumbnail = (sectionUser) => {
      return sectionUser.imageUrl
        ? { uri: sectionUser.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderUser = (user) => {
      return (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: margin.s8}}
        onPress={() => {
          this.handleUserSelected(user)
        }}>
          <Thumbnail style={{width: 50, height: 50, margin: margin.s4}} source={getThumbnail(user)} />
          <Text style={userStyles}>{user.name}</Text>
          { selectedUsers.has(user.user_id) ? <Icon name="md-checkmark" style={{color: color.green, fontSize: 16}}/> : <Text /> }
        </TouchableOpacity>
      )
    }

    const renderAvailableUser = (users) => {
      // const sectionUsers = [
      //   {
      //       "user_id": 6,
      //       "name": "test2",
      //       "first_name": "test2",
      //       "last_name": "test2",
      //       "role": "2"
      //   },
      //   {
      //       "user_id": 7,
      //       "name": "test",
      //       "first_name": "test",
      //       "last_name": "test",
      //       "role": "member"
      //   }
      // ];

      return (
        <View style={{flexDirection: 'column', marginRight: margin.s4}}>
          <List
            dataArray={users}
            renderRow={renderUser}
          />
        </View>
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: color.white}}>
          <LoadingView isShown={refreshing} noBack isModal={false} />
          <Content contentContainerStyle={{ flexGrow: 1 }} >
            <Form style={{marginHorizontal: margin.s12}}>
              
              <View style={{borderBottomWidth: 1, borderColor: color.border, margin: margin.s16, height: 80}}>
                <Label>Task Name</Label>
                <Input style={{fontSize: 18}} value={name} onChangeText={(name) => this.setState({name})}/>
              </View>

              <View style={{borderBottomWidth: 1, borderColor: color.border, marginHorizontal: margin.s16, height: 80, flexDirection: 'row'}}>
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

              <View style={{borderBottomWidth: 1, borderColor: color.border, margin: margin.s16, height: 80}}>
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
                {renderAvailableUser(sectionUsers)}
              </View>
            </Form>

            <View style={{margin: margin.s16, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{fontSize: 18, color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => dispatchAddTask(sectionId, name, startDate, finishDate, status) }>
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
  userStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    margin: margin.s16,
    flex: 1
  },
};

const mapStateToProps = (state) => ({
  task: state.storyboard.addTask.result.data,
  refreshing: state.storyboard.addTask.refreshing,
  error: state.storyboard.addTask.error,
  section: state.storyboard.getOneSection.result.data,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddTask(sectionId, name, startDate, finishDate, status) {
    dispatch(addTask(sectionId, name, startDate, finishDate, status))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);