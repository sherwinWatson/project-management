import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headerConfig } from '../config/headerConfig';
import { Button, StyleProvider, Container, List, ListItem, Thumbnail, Content } from 'native-base';
import TitleView from '../components/TitleView';
import theme from '../styles/theme/index';
import color from '../styles/color';
import margin from '../styles/margin';
import { getOneSection } from '../redux/storyboard/actions';
import { Loader } from '../components/Loader';
import ActionButton from 'react-native-action-button';

class SectionDetail extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      complete: '',
      users: [],
      tasks: [],
    }
  }

  componentWillMount() {
    const { dispatchLoadSection } = this.props    
    const { sectionId } = this.props.navigation.state.params

    //loadsection by section id
    dispatchLoadSection(sectionId)
  }

  componentWillReceiveProps(nextProps) {
    // set data section by id to this state
    const { section } = this.props

    if (nextProps.section.section_id) {
      const { complete, users, tasks } = nextProps.section

      this.setState({
        complete: Math.round(complete * 100) / 100, // ambil dua angka belakang decimal jika ada 
        users: users.data, 
        tasks: tasks.data,
      })
    }
  }
  
  updateTask = ({task}) => {
    // update array tasks dengan task yg baru ditambahkan
    this.setState({ tasks: [...this.state.tasks, task] })
  }

  render() {
    const { sectionId } = this.props.navigation.state.params
    const { navigation, section, isRefreshing, isUpdate } = this.props
    const { textStyle, listItemStyle, cicleStyle, textCircleStyle, titleContainerStyle, titleContentStyle, titleStyle, titlePortionStyle, titleDateStyle } = styles
    const { complete, users, tasks} = this.state

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
        <View style={{flex: 1, flexDirection: 'row', marginVertical: margin.s8}}>
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
          <Content>
            <Loader loading={isRefreshing} />
            <View style={titleContainerStyle}>
              <View style={titleContentStyle}>
                <Text style={titleStyle}>{section.subject}</Text>
                <Text style={titlePortionStyle}> ( {parseInt(section.portion)}% )</Text>
              </View>
              <Text style={titleDateStyle}>{section.target_date}</Text>
            </View>

            <List style={{margin: margin.s16}}>
              <ListItem style={listItemStyle}>
                <Text style={textStyle}>{section.description}</Text>
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
              <ListItem last style={{justifyContent: 'center', alignContent: 'center'}}>
                <View style={cicleStyle}>
                  <Text style={textCircleStyle}>
                    {complete}%
                  </Text>
                </View>
              </ListItem>
            </List>
          </Content>
          <ActionButton
            buttonColor={color.green}
            onPress={() => navigation.navigate('NewTask', { sectionId: sectionId, updateTask: this.updateTask, sectionUsers: users})}
          />
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  listItemStyle: {
    paddingVertical: margin.s12
  },
  titleContainerStyle: {
    backgroundColor: color.black, 
    paddingHorizontal: margin.s8, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  titleContentStyle: {
    margin: margin.s8, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  titleStyle:{
    color: color.white, 
    fontSize: 16, 
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  titlePortionStyle:{
    color: color.light_grey, 
    fontSize: 16
  },
  titleDateStyle: {
    margin: margin.s8, 
    color: color.white, 
    fontSize: 16
  },
  cicleStyle: {
    borderWidth: 1, 
    height: 200, 
    width: 200, 
    margin: margin.s24, 
    padding: margin.s24,
    justifyContent: 'center', 
    alignContent: 'center', 
    borderRadius: 100,
    borderWidth: 1, 
    borderColor: color.light_grey
  }, 
  textCircleStyle: {
    fontSize: 48, 
    alignSelf: 'center', 
    color: color.black
  },
  textStyle: {
    color: color.black,
    fontSize: 16
  },
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