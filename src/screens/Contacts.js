import React from 'react'
import { connect } from 'react-redux'
import {Platform} from 'react-native'
import { View, StyleProvider, Container, Content, Button, Icon, List, ListItem, Left, Thumbnail, Body, Text, Spinner } from 'native-base'
import Contact from 'react-native-contacts'
import { requestContactsPermission } from './../helpers/permissionRequester'
import theme from '../styles/theme'
import font from '../styles/font'
import margin from '../styles/margin'
import color from '../styles/color'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
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
        <ListItem style={{ ...styles.container }} avatar>
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

    return (
      <StyleProvider style={theme}>
        <Container>
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
