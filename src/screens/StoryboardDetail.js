import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, StyleProvider, Container, Content, Button, Icon, List, ListItem, Body, Thumbnail } from 'native-base'
import { View, Image } from 'react-native'
import LoadingView from './../components/LoadingView'
import moment from 'moment/moment'
import margin, { screen } from '../styles/margin'
import font from './../styles/font'
import theme from '../styles/theme'
import color from '../styles/color'
import { getUserStoryboard, addUserStoryboard, getOneStoryboard } from '../redux/storyboard/actions';

class StoryboardDetail extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      storyboardId: '',
      name: '',
      description: '',
      startDate: '',
      finishDate: '',
      timeLeft: '',
      createdBy: '',
      createdByName: '',
      createdAt: ''
    }
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params
    const { loadUserStoryboards, getOneStoryboard } = this.props

    //load user of this storyboard
    loadUserStoryboards(id)
    //load storyboard by id
    getOneStoryboard(id)
  }

  componentWillReceiveProps(nextProps) {
    // set data storyboard by id to this state
    const { storyboard } = this.props

    if (nextProps.storyboard.storyboard_id) {
      const { storyboard_id, name, description, start_date, finish_date, time_left, created_by, created_by_name, created_at} = nextProps.storyboard

      this.setState({
        storyboardId: storyboard_id,
        name: name,
        description: description,
        startDate: start_date,
        finishDate: finish_date,
        timeLeft: time_left,
        createdBy: created_by,
        createdByName: created_by_name,
        createdAt: created_at
      })
    }
  }

  addNewUserToStoryboard = ({member}) => {
    // add user to storyboard
    this.props.dispatchAddUserStoryboard(this.state.storyboardId, member);
  }

  render() {
    const { container, contentBody, content, text, listTitle, listSubTitle,
      contentTime, userStyles, roleContentStyles, roleTextStyles
    } = styles
    const { userStoryboard, navigation } = this.props
    const { storyboardId, name, description, startDate, finishDate, timeLeft, createdBy, createdByName, createdAt } = this.state

    const renderRoleUser = (role) => {
      if (role === 'admin') {
        return (
          <View style={roleContentStyles}>
            <Text style={roleTextStyles}>{role}</Text>
          </View>
        )
      }
      return <Text/>
    }

    const getThumbnail = (userStoryboard) => {
      return userStoryboard.imageUrl
        ? { uri: userStoryboard.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderSelectedListItem = (userStoryboard) => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail style={{width: 50, height: 50, margin: margin.s4}} source={getThumbnail(userStoryboard)} />
          <Text style={userStyles}>{userStoryboard.name}</Text>
          {renderRoleUser(userStoryboard.role)}
        </View>
      )
    }

    const renderListMember = () => {
      return (
        <View>
          <Text style={listSubTitle}>Participants</Text>
          <View style={{flexDirection: 'column', marginRight: margin.s4}}>
            <List
              dataArray={userStoryboard}
              renderRow={renderSelectedListItem}
            />
          </View>
        </View>
      )
    }

    const renderContent = () => {
      return (
        <List contentContainerStyle={{ flexGrow: 1}}>
          <ListItem style={container} >
            <View style={content}>
              <Body style={contentBody}>
                <Text style={text}>{description}</Text>
              </Body>
            </View>
          </ListItem>
          <ListItem style={container}>
            <View style={content}>
              <Body style={contentBody}>
                <View style={contentTime}>
                  <Text style={text}>Storyboard Range Periode</Text>
                </View>
                <View style={contentTime}>
                  <Text style={listTitle}>
                    {moment(startDate).format('DD MMM YYYY')} - {moment(finishDate).format('DD MMM YYYY')}
                  </Text>
                  <Text>Edit</Text>
                </View>
                <View style={contentTime}>
                  <Text style={text}>Days Left:</Text>
                  <Text style={listSubTitle}>{timeLeft}</Text>
                </View>
              </Body>
            </View>
          </ListItem>
          <ListItem style={container}>
            <View style={content}>
              <Body style={contentBody}>
                {renderListMember()}
              </Body>
            </View>
          </ListItem>
        </List>
      )
    }

    const handleEditStoryboard = _.throttle((navigationn, data) => {
      navigationn.navigate('NewProject', { id: data.storyboardId, data: data })
    }, 1200, {trailing: false});

    return (
      <StyleProvider style={theme}>
        <Container>
          <Content contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
            <Image
              source={require('./../img/aad705dd-889c-47df-8934-4725d75cfbaa.jpg')}
              style={{width: screen.width, height: 200, zIndex: -8}}
            />
            <View style={{position: 'absolute', zIndex: 8, width: screen.width, height: 200, justifyContent: 'space-between'}}>
              <View style={content}>
                <Button transparent onPress={() => navigation.goBack(null)}>
                  <Icon style={{ color: color.toolbarItem }} name="ios-arrow-back" />
                </Button>
                <Button transparent onPress={() => navigation.navigate('AddContacts', {addNewUserToStoryboard: this.addNewUserToStoryboard, userStoryboard: userStoryboard})}>
                  <Icon style={{ color: color.toolbarItem }} name="md-person-add" />
                </Button>
              </View>
              <View style={content}>
                <View style={contentBody}>
                  <View style={{marginLeft: margin.s16}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: color.white}
                  }>{name.toUpperCase()}</Text>
                    <Text style={{fontSize: 12, color: color.white, marginBottom: margin.s8 }
                  }>Created by {createdByName}, {moment(createdAt).format('DD MMM YYYY')}</Text>
                  </View>
                </View>
                <Button transparent onPress={() => handleEditStoryboard(navigation, this.state)}>
                  <Icon style={{ color: color.toolbarItem }} name="md-create" />
                </Button>
              </View>
            </View>

            {renderContent()}
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  container: {
    margin: margin.s12,
    borderBottomColor: color.lightText,
  },
  content: {
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  contentBody: {
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    marginBottom: margin.s8,
    alignSelf: 'flex-start',
    ...font.bold,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: margin.s8,
    fontWeight: 'bold',
    color: color.black,
  },
  listSubTitle: {
    fontSize: 16,
    marginBottom: margin.s8,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'green',
  },
  contentTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    margin: margin.s16,
    flex: 1
  },
  roleContentStyles: {
    borderWidth: 1,
    borderColor: 'limegreen',
    borderRadius: 5
  },
  roleTextStyles: {
    color: 'limegreen',
    fontSize: 12,
    margin: margin.s4
  }
}

const mapStateToProps = (state) => ({
  userStoryboard: state.storyboard.userStoryboards.result.data,
  refreshing: state.storyboard.userStoryboards.refreshing,
  error: state.storyboard.userStoryboards.error,
  storyboard: state.storyboard.modifyStoryboard.result.data,
  refreshingStoryboard: state.storyboard.modifyStoryboard.refreshing,
  errorStoryboard: state.storyboard.modifyStoryboard.error
})

const mapDispatchToProps = (dispatch, props) => ({
  loadUserStoryboards(storyboardId) {
    dispatch(getUserStoryboard(storyboardId))
  },
  dispatchAddUserStoryboard(storyboardId, member) {
    dispatch(addUserStoryboard(storyboardId, member))
  },
  getOneStoryboard(storyboardId) {
    dispatch(getOneStoryboard(storyboardId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryboardDetail)
