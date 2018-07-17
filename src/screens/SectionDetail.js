import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headerConfig } from '../config/headerConfig';
import { Button, StyleProvider, Container, List, ListItem, Thumbnail } from 'native-base';
import TitleView from '../components/TitleView';
import theme from '../styles/theme/index';
import color from '../styles/color';
import margin from '../styles/margin';
import { getOneSection } from '../redux/storyboard/actions';
import { Loader } from '../components/Loader';

class SectionDetail extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      description: '',
      isDone: '',
      targetDate: '',
      portion: '',
      complete: '',
      timeLeft: '',
      users: [],
      tasks: [],
    }
  }

  componentWillMount() {
    const { dispatchLoadSection } = this.props    
    const { sectionId } = this.props.navigation.state.params

    console.log('component will mount section details')
    console.log(sectionId)
    //loadsection by section id
    dispatchLoadSection(sectionId)
  }

  componentWillReceiveProps(nextProps) {
    // set data section by id to this state
    const { section } = this.props
    
    console.log('component will receive props')
    console.log(section)  
    console.log(nextProps.section)

    if (nextProps.section.section_id) {
      const { subject, description, is_done, target_date, portion, complete, time_left, users, tasks } = nextProps.section

      this.setState({
        subject: subject, 
        description: description, 
        isDone: is_done, 
        targetDate: target_date,
        portion: portion,
        complete: complete, 
        timeLeft: time_left,
        users: users.data, 
        tasks: tasks.data,
      })
    }
  }

  render() {
    const { sectionId } = this.props.navigation.state.params
    const { navigation, section, isRefreshing, isUpdate } = this.props
    const { textStyle, listItemStyle } = styles
    const { subject, description, isDone, targetDate, portion, complete, timeLeft, users, tasks} = this.state

    console.log('render')
    console.log(section)
    console.log(isUpdate)
    console.log(isRefreshing)

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderSelectedListItem = (data) => {
      return (
        <View style={{margin: margin.s12, alignItems: 'center'}}>
          <Thumbnail style={{width: 50, height: 50}} source={getThumbnail(data)} />
          <Text style={{marginTop: margin.s4}}>{data.name}</Text>
        </View>
      )
    }

    const renderSelectedTask = (task) => {
      return (
        <View style={{flex: 1, flexDirection: 'row', marginVertical: margin.s4}}>
          <View style={{flex: 1, borderWidth: 0}}>
            <Text>{task.name}</Text>
          </View>
          <View>
            <Text style={{paddingHorizontal: margin.s16}}>{task.status}</Text>
          </View>
          <View>
            <Text>{task.start_date}</Text>
          </View>
        </View>
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: color.white}}>
          <Loader loading={isRefreshing} />
          <View style={{backgroundColor: color.black, paddingHorizontal: margin.s8, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{margin: margin.s4, flexDirection: 'row'}}>
              <Text style={{color: color.white}}>{section.subject}</Text>
              <Text style={{color: color.light_grey}}> ( {parseInt(section.portion)}% )</Text>
            </View>
            <Text style={{margin: margin.s4, color: color.white}}>{section.target_date}</Text>
          </View>

          <List style={{margin: margin.s12}}>
            <ListItem style={listItemStyle}>
              <Text>{section.description}</Text>
            </ListItem>
            <ListItem style={listItemStyle}>
              <View>
                <Text>People on this card</Text>
                <View style={{flexDirection: 'row', marginRight: margin.s4}}>
                  <List
                    horizontal={true}
                    dataArray={users}
                    renderRow={renderSelectedListItem}
                  />
                </View>
              </View>
            </ListItem>
            <ListItem style={listItemStyle} last>
              <List 
                dataArray={tasks}
                renderRow={renderSelectedTask}
              />
            </ListItem>
            <ListItem last>
              <View style={{borderWidth: 1, flex: 1, justifyContent: 'center', alignContent: 'center', height: 300}}>
                <Text style={{fontSize: 32}}>
                  {complete}%
                </Text>
              </View>
            </ListItem>
          </List>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  listItemStyle: {
    paddingVertical: margin.s16
  },
  textStyle: {
    color: color.white
  }
}

const mapStateToProps = (state) => ({
  section: state.storyboard.getOneSection.result.data,
  isRefreshing: state.storyboard.getOneSection.refreshing,
  error: state.storyboard.getOneSection.error,
  isUpdate: state.storyboard.getOneSection.isUpdate
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchLoadSection(sectionId) {
    dispatch(getOneSection(sectionId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (SectionDetail);