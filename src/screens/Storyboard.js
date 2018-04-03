import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab } from 'native-base'
import {Platform, RefreshControl, View, TouchableOpacity} from 'react-native'
import margin from '../styles/margin'
import font from './../styles/font'

import { getStoryboard, addStoryboard } from './../redux/storyboard/actions'
import color from '../styles/color'
import Prompt from './../components/Prompt'
import ActionButton from 'react-native-action-button'

const getThumbnail = (data) => {
  return data.imageUrl
    ? { uri: data.imageUrl }
    : require('./../img/no_avatar.png')
}

class Storyboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promptVisible: false,
    }
  }

  componentWillMount() {
    const {loadStoryboards} = this.props
    loadStoryboards()
  }

  render() {
    const {
      loadStoryboards,
      dispatchAddStoryboard,
      storyboard,
      navigation,
      refreshing,
      page,
      hasNextPage,
      error,
    } = this.props

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

    const openDetail = _.throttle((navigationn, data) => {
      navigationn.navigate('Detail', { id: data.id })
    }, 1200, {trailing: false})


    const renderListItem = (data) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => openDetail(navigation, data)} avatar>
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

    const renderFailView = () => {
      return null
    }

    const renderFooterLoading = () => hasNextPage &&
      <View style={{ paddingTop: 10, paddingBottom: 30 }}>
        <Spinner color={color.space_grey}/>
      </View>

    const renderContent = () => {
      return (
        <List
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={renderRefreshControl()}
          removeClippedSubviews={false}
          dataArray={storyboard}
          renderRow={renderListItem}
          onEndReached={() => {
            if (hasNextPage) {
              loadStoryboards()
            }
          }}
          onEndReachedThreshold={10}
          renderHeader={renderFailView}
          renderFooter={renderFooterLoading}/>
      )
    }

    return (
      <View style={{backgroundColor: color.pale_white}}>
        {renderContent()}
        <ActionButton
          buttonColor={color.green}
          onPress={() => {
            this.setState({
              promptVisible: true,
            })
          }}
        />
        <Prompt
          title="New Storyboard"
          placeholder="Name"
          visible={ this.state.promptVisible }
          onCancel={ () => this.setState({
            promptVisible: false,
          }) }
          onSubmit={ (value) => {
            this.setState({
              promptVisible: false,
            })
            dispatchAddStoryboard(value)
          }}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  storyboard: state.storyboard.storyboards.result.data,
  refreshing: state.storyboard.storyboards.refreshing,
  error: state.storyboard.storyboards.error,
  page: 1,
  hasNextPage: false,
  limit: 10,
})

const mapDispatchToProps = (dispatch, props) => ({
  loadStoryboards() {
    dispatch(getStoryboard())
  },
  dispatchAddStoryboard(name) {
    dispatch(addStoryboard(name))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Storyboard)
