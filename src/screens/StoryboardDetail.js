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
import { getUserStoryboard, addUserStoryboard } from '../redux/storyboard/actions';

class StoryboardDetail extends Component {
  static navigationOptions = {
    header: null,
  }
  
  componentWillMount() {
    const { data } = this.props.navigation.state.params
    const { loadUserStoryboards, error } = this.props

    loadUserStoryboards(data.storyboard_id)
  }
  
  render() {
    //get param from previous navigation
    const { data } = this.props.navigation.state.params
    const { container, contentBody, content, text, listTitle, listSubTitle, 
      contentTime, userStyles, roleContentStyles, roleTextStyles
    } = styles
    const { userStoryboard, navigation } = this.props

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

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderSelectedListItem = (data) => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail style={{width: 50, height: 50, margin: margin.s4}} source={getThumbnail(data)} />
          <Text style={userStyles}>{data.name}</Text>
          {renderRoleUser(data.role)}
        </View>
      )
    }

    const renderListMember = () => {
      const data = userStoryboard

      return (
        <View>
          <Text style={listSubTitle}>Peserta</Text>
          <View style={{flexDirection: 'column', marginRight: margin.s4}}>
            <List
              dataArray={data}
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
                <Text style={text}>{data.description}</Text>
              </Body>
            </View>
          </ListItem>
          <ListItem style={container}>
            <View style={content}>
              <Body style={contentBody}>
                <View style={contentTime}>
                  <Text style={text}>Waktu Pengerjaan</Text>
                </View>
                <View style={contentTime}>
                  <Text style={listTitle}>
                    {moment(data.start_date).format('DD MMM YYYY')} - {moment(data.finish_date).format('DD MMM YYYY')} 
                  </Text>
                  <Text>Edit</Text>
                </View>
                <View style={contentTime}>
                  <Text style={text}>Sisa hari kerja:</Text>
                  <Text style={listSubTitle}>{data.time_left}</Text>
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
      navigationn.navigate('NewProject', { id: data.storyboard_id, data: data })
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
                <Button transparent onPress={() => console.log('Tambah user diteken')}>
                  <Icon style={{ color: color.toolbarItem }} name="md-person-add" />
                </Button>
              </View>
              <View style={content}> 
                <View style={contentBody}> 
                  <View style={{marginLeft: margin.s16}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: color.white}
                  }>{data.name.toUpperCase()}</Text>
                    <Text style={{fontSize: 12, color: color.white, marginBottom: margin.s8 }
                  }>Dibuat oleh {data.created_by_name}, {moment(data.created_at).format('DD MMM YYYY')}</Text>
                  </View> 
                </View>
                <Button transparent onPress={() => handleEditStoryboard(navigation, data)}>
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
})

const mapDispatchToProps = (dispatch, props) => ({
  loadUserStoryboards(storyboardId) {
    dispatch(getUserStoryboard(storyboardId))
  },
  dispatchAddUserStoryboard() {
    dispatch(addUserStoryboard(storyboardId, userId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryboardDetail)
