import React from 'react'
import { connect } from 'react-redux'
import {Platform, TouchableOpacity} from 'react-native'
import { View, StyleProvider, Container, Content, Button, Icon, List, ListItem, Left, Thumbnail, Body, Text, Spinner } from 'native-base'
import Contact from 'react-native-contacts'
import { requestContactsPermission } from './../helpers/permissionRequester'
import theme from '../styles/theme'
import font from '../styles/font'
import margin from '../styles/margin'
import color from '../styles/color'
import IconClose from '../img/IconClose'
import ActionButton from 'react-native-action-button'
import LoadingView from './../components/LoadingView'
import {headerConfig} from '../config/headerConfig'
import { getUserByContacts } from '../redux/storyboard/actions';

class Contacts extends React.Component {
  static navigationOptions = headerConfig('New Project', true)

  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      selectedContacts: [],
      noPermission: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isRefreshing, error } = this.props

    if (isRefreshing != nextProps.isRefreshing) {
      if (!nextProps.isRefreshing && !nextProps.error) {
        this.props.navigation.goBack(null)
      }
    }
  }

  requestContactsPermission() {
    const getContacts = () => {
      Contact.getAll((err, contacts) => {
        if (err) throw err

        const phonenumbers = [];
        this.setState({contacts: contacts})
        this.state.contacts.map((item, i) => {
          
          if(item.phoneNumbers.length > 0) {
            item.phoneNumbers.map((number, j) => { 
                let tmp = number.number.toString().replace(/\D/g,'')    // remove all non number character
                let index = tmp.substring(0, 2) == '08' ? '628' : tmp.substring(0, 2) // ganti 08 jadi 628
                tmp = index + tmp.substring(2, tmp.length);
                
                phonenumbers.push({ phonenumbers: tmp })
            })
          }
        })
        //send list phonenumbers to backend to process and return registered user
        this.props.dispatchGetUserByContacts(phonenumbers)
      })
    }

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      requestContactsPermission().then((value) => {
        if (value) {
          getContacts()
        } else {
          this.setState({noPermission: true})
        }
      })
    } else {
      getContacts()
    }
  }

  componentWillMount() {
    this.requestContactsPermission()
  }

  render() {
    const styles = {
      container: {
        margin: margin.s12,
        borderBottomColor: color.darkText,
      },
      text: {
        fontSize: 21,
        marginBottom: margin.s8,
        alignSelf: 'flex-start',
        ...font.bold,
      },
      content: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
      },
      contentBody: {
        flexShrink: 1,
        justifyContent: 'space-between',
      },
      actionButtonIcon: {
        color: 'white',
        fontSize: 20,
      },
    }
    const { userContacts, ifRefreshingUserContacts, errorUserContacts } = this.props

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderListItem = (data, s, index) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => {
          this.setState({selectedContacts: [...this.state.selectedContacts, {...data}]})
          const newValues2 = this.props.userContacts.slice(parseInt(index, 10) + 1)
          const newValues1 = this.props.userContacts.slice(0, parseInt(index, 10))
          this.props.userContacts = newValues1.concat(newValues2)
        }} avatar>
          <Left>
            <Thumbnail small source={getThumbnail(data)} />
          </Left>
          <View style={{...styles.content}}>
            <Body style = {{...styles.contentBody}}>
              <Text style={{ ...styles.text }}>{data.name}</Text>
            </Body>
          </View>
        </ListItem>
      )
    }

    const renderFooterLoading = () =>
      <View style={{ paddingTop: 10, paddingBottom: 30 }}>
        <Spinner color={color.space_grey}/>
      </View>

    const renderContent = () => {
      if (this.state.noPermission) {
        return (
          <TouchableOpacity
            style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => this.requestContactsPermission()}
          >
            <Text style={{textAlign: 'center'}}>{'No permission allowed.\nPlease allow permission from your phone settings.'}</Text>
            <Button style={{alignSelf: 'center'}} onPress={() => this.requestContactsPermission()}><Text>Tap Here To Allow</Text></Button>
          </TouchableOpacity>
        )
      }
      return (
        <List
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          dataArray={this.props.userContacts}
          renderRow={renderListItem}
          // renderFooter={renderFooterLoading}
        />
      )
    }

    const renderSelectedListItem = (data, s, index) => {
      return (
        <TouchableOpacity
          style={{margin: margin.s12, alignItems: 'center'}}
          onPress={() => {
            const newValues2 = this.state.selectedContacts.slice(parseInt(index, 10) + 1)
            const newValues1 = this.state.selectedContacts.slice(0, parseInt(index, 10))
            this.setState({selectedContacts: newValues1.concat(newValues2)})
          }}>
          <Thumbnail style={{width: 50, height: 50}} source={getThumbnail(data)} />
          <Text style={{marginTop: margin.s4}}>{data.name}</Text>
          <View
            style={{
              position: 'absolute',
              backgroundColor: color.space_grey,
              zIndex: 8,
              borderRadius: 20,
              left: 28,
              top: 30,
              borderWidth: 2,
              borderColor: color.pale_white,
              padding: margin.s4,
            }}>
            <IconClose
              color={color.white}
              width={12}
              height={12}/>
          </View>
        </TouchableOpacity>
      )
    }

    const renderSelected = () => {
      return (
        <View style={{flexDirection: 'row', margin: margin.s4}}>
          <List
            horizontal={true}
            dataArray={this.state.selectedContacts}
            renderRow={renderSelectedListItem}
          />
        </View>
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={this.state.contacts === [] && !this.state.noPermission} isModal={false} />
          {renderSelected()}
          {renderContent()}
          <ActionButton
            buttonColor={color.green}
            onPress={() => {
              this.props.navigation.navigate('NewProject', {member: this.state.selectedContacts})
            }}
            renderIcon={() => {
              return <Icon name="md-arrow-forward" style={styles.actionButtonIcon} />
            }}
          />
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  isRefreshing: state.storyboard.addStoryboard.refreshing,
  done: state.storyboard.addStoryboard.result.data,
  error: state.storyboard.addStoryboard.error,
  userContacts: state.storyboard.userContacts.result.data,
  ifRefreshingUserContacts: state.storyboard.userContacts.refreshing,
  errorUserContacts: state.storyboard.userContacts.error
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchGetUserByContacts(phonenumbers) {
    dispatch(getUserByContacts(phonenumbers))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts)
