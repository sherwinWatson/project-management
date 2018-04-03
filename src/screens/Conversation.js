import React from 'react'
import { connect } from 'react-redux'
import color from '../styles/color'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab } from 'native-base'
import {Platform, RefreshControl, View, TouchableOpacity} from 'react-native'
import font from '../styles/font'
import margin from '../styles/margin'

const getThumbnail = (data) => {
  return data.imageUrl
    ? { uri: data.imageUrl }
    : require('./../img/no_avatar.png')
}

const styles = {
  container: {
    margin: margin.s12,
  },
  addNewButton: {
    flex: 1,
    margin: margin.s16,
    justifyContent: 'center',
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

const renderRefreshControl = () => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => loadStoryboards()}
    />
  )
}

const renderListItem = (data) => {
  return (
    <ListItem style={{ ...styles.container }} avatar>
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

const renderContent = () => {
  return (
    <List
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={renderRefreshControl()}
      removeClippedSubviews={false}
      dataArray={conversations}
      renderRow={renderListItem}
      onEndReachedThreshold={10}/>
  )
}
class Conversation extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: color.pale_white}}>
        {renderContent()}
      </View>
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
)(Conversation)
