import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, DatePicker, Picker, Icon } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View } from 'react-native';
import { addTask } from '../redux/storyboard/actions';

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      name: 'Nama Task disini',
      startDate: moment(),
      finishDate: moment(),
      status: 'START',
    }
  }

  componentWillMount() {

  }

  render() {
    const { navigation, dispatchAddTask, task, error, refreshing } = this.props
    const { sectionId } = navigation.state.params    
    const {}  = styles
    const { name, startDate, finishDate, status } = this.state

    console.log('render new task')
    console.log(sectionId)
    console.log(task)
    console.log(error)
    console.log(refreshing)

    return (
      <StyleProvider style={theme}>
        <Container>
          <Content>
            <Form style={{ marginLeft: margin.s12, marginRight: margin.s12 }}>
              <Item stackedLabel>
                <Label>Nama Task</Label>
                <Input value={name}/>
              </Item>
              <Item>
                <Text>Start Date: {startDate.toString().substr(4, 12)}</Text>
                <DatePicker
                  defaultDate={new Date()}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText='select date...'
                  textStyle={{ color: color.black, fontSize: 18 }}
                  style={{flex: 1}}
                  placeHolderTextStyle={{ color: color.light_grey, fontSize: 18 }}
                  onDateChange={startDate => this.setState({startDate})}
                />
              </Item>
              <Item>
                <Text>Finish Date: {finishDate.toString().substr(4, 12)}</Text>
                <DatePicker
                  defaultDate={new Date()}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText='select date...'
                  textStyle={{ color: color.black, fontSize: 18 }}
                  style={{flex: 1}}
                  placeHolderTextStyle={{ color: color.light_grey, fontSize: 18 }}
                  onDateChange={finishDate => this.setState({finishDate})}
                />
              </Item>
              <Item>
                {/* <Label>Status</Label> */}
                <Picker
                  mode="dropdown"
                  iosHeader="Choose Status"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined, flex: 1, borderWidth: 1 }}
                  selectedValue={status}
                  onValueChange={status => this.setState({status})}
                >
                  <Picker.Item label="Start" value="START" />
                  <Picker.Item label="Inprogress" value="INPROGRESS" />
                  <Picker.Item label="Done" value="DONE" />
                </Picker>
              </Item>
            </Form>
            
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button transparent onPress={() => navigation.goBack(null)}>
                <Text style={{color: color.green}}>CANCEL</Text>
              </Button>
              <Button transparent onPress={() => dispatchAddTask(sectionId, name, startDate, finishDate, status)}>
                <Text style={{color: color.green}}>FINISH</Text>
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
