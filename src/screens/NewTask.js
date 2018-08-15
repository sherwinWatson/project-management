import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, DatePicker, Picker, Icon } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View, Alert } from 'react-native';
import { addTask } from '../redux/storyboard/actions';
import LoadingView from '../components/LoadingView';

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      name: 'Nama Task disini',
      startDate: new Date(),
      finishDate: new Date(),
      status: 'start',
    }
  }
  
  componentWillReceiveProps(nextProps) {
    const { error, task, refreshing, navigation } = this.props

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
      navigation.goBack(null)
    }
  }

  render() {
    const { navigation, dispatchAddTask, task, error, refreshing } = this.props
    const { sectionId } = navigation.state.params    
    const {}  = styles
    const { name, startDate, finishDate, status } = this.state

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

};

const mapStateToProps = (state) => ({
  task: state.storyboard.addTask.result.data,
  refreshing: state.storyboard.addTask.refreshing,
  error: state.storyboard.addTask.error,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddTask(sectionId, name, startDate, finishDate, status) {
    dispatch(addTask(sectionId, name, startDate, finishDate, status))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
