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
import TitleView from './../components/TitleView'

class Contacts extends React.Component {
  static navigationOptions = {
    headerTitleStyle: {
      alignSelf: 'center',
      color: color.toolbarItem,
    },
    headerStyle: {
      borderBottomWidth: Platform.OS === 'android' && Platform.Version < 21 ? 0.5 : 0,
      borderBottomColor: Platform.OS === 'ios' ? '#a7a6ab' : color.border,
      backgroundColor: color.black,
    },
    headerTitle: <TitleView title={'New Project'} />,
    headerRight: <View/>,
    gesturesEnabled: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      selectedContacts: [],
    }
  }

  componentWillMount() {
    const getContacts = () => {
      Contact.getAll((err, contacts) => {
        if (err) throw err

        this.setState({contacts: contacts})
      })
    }

    if (Platform.OS === 'android') {
      requestContactsPermission().then((value) => {
        if (value) {
          getContacts()
        }
      })
    } else {
      getContacts()
    }
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
    }

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderListItem = (data) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => {
          this.setState({selectedContacts: [...this.state.selectedContacts, {name: data.givenName}]})
        }} avatar>
          <Left>
            <Thumbnail small source={getThumbnail(data)} />
          </Left>
          <View style={{...styles.content}}>
            <Body style = {{...styles.contentBody}}>
              <Text style={{ ...styles.text }}>{data.givenName.concat(data.familyName ? ' ' + data.familyName : '')}</Text>
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
      return (
        <List
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          dataArray={this.state.contacts}
          renderRow={renderListItem}
          // renderFooter={renderFooterLoading}
        />
      )
    }

    const renderSelectedListItem = (data) => {
      return (
        <TouchableOpacity style={{margin: margin.s12, alignItems: 'center'}}>
          <Thumbnail small source={getThumbnail(data)} />
          <Text style={{marginTop: margin.s4}}>{data.name}</Text>
          <View
            style={{
              position: 'absolute',
              backgroundColor: color.space_grey,
              zIndex: 8,
              borderRadius: 20,
              left: 20,
              top: 20,
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
          {renderSelected()}
          {renderContent()}
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts)
