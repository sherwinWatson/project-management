import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab } from 'native-base'
import {Platform, RefreshControl, View} from 'react-native'
import {
  addStoryboardDetail,
  getStoryboardDetail,
  modifyStoryboardDetail,
  removeStoryboardDetail,
} from '../redux/storyboard/actions'
import theme from '../styles/theme'
import moment from 'moment/moment'
import font from '../styles/font'
import margin from '../styles/margin'
import color from '../styles/color'
import TitleView from './../components/TitleView'
import Prompt from './../components/PromptWithDatePicker'
import ActionButton from 'react-native-action-button'
import LoadingView from './../components/LoadingView'

class SectionList extends React.Component {
  constructor() {
    super()
    this.state = {
      promptVisible: false,
      isEditing: false,
      selectedId: null,
      defaultValue: '',
      defaultValue2: '',
      defaultValue3: '',
    }
  }

  static navigationOptions = {
    headerTitleStyle: {
      alignSelf: 'center',
      color: color.toolbarItem,
    },
    headerStyle: {
      borderBottomWidth: Platform.OS === 'android' && Platform.Version < 21 ? 0.5 : 0,
      borderBottomColor: Platform.OS === 'ios' ? '#a7a6ab' : color.border,
      backgroundColor: color.pale_white,
    },
    headerTitle: <TitleView title={'Sections'} />,
    headerRight: <View/>,
    gesturesEnabled: true,
  }

  componentWillMount() {
    const {loadStoryboardDetails} = this.props
    const { id } = this.props.navigation.state.params

    loadStoryboardDetails(id)
  }

  componentWillReceiveProps(nextProps) {
    const {loadStoryboardDetails, addDone, modifyDone, removeDone} = this.props
    const {id} = this.props.navigation.state.params

    if (!_.isEqual(addDone, nextProps.addDone) || !_.isEqual(modifyDone, nextProps.modifyDone) || !_.isEqual(removeDone, nextProps.removeDone)) {
      loadStoryboardDetails(id)
    }
  }

  render() {
    const { details, refreshing, dispatchAddStoryboardDetail, dispatchModifyStoryboardDetail, dispatchRemoveStoryboardDetail } = this.props
    const { id } = this.props.navigation.state.params

    const styles = {
      container: {
        margin: margin.s12,
        borderBottomColor: color.darkText,
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

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderListItem = (data) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => openDetail(navigation, data)} avatar>
          <View style={{...styles.content}}>
            <Body style = {{...styles.contentBody}}>
              <Text style={{ ...styles.text }}>{data.subject}</Text>
            </Body>
          </View>
        </ListItem>
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={refreshing} solid />
          <List
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={renderRefreshControl()}
            removeClippedSubviews={false}
            dataArray={details}
            renderRow={renderListItem}
          />
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => {
              this.setState({
                promptVisible: true,
                isEditing: false,
                defaultValue: '',
                defaultValue2: '',
                defaultValue3: '',
              })
            }}
          />
          <Prompt
            title="New Detail"
            placeholder="Subject"
            placeholder2="Description"
            placeholder3="Target Date"
            defaultValue={this.state.defaultValue}
            defaultValue2={this.state.defaultValue2}
            defaultValue3={this.state.defaultValue3}
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
              promptVisible: false,
            }) }
            onSubmit={ (value, value2, value3) => {
              if (this.state.isEditing) {
                dispatchModifyStoryboardDetail(this.state.selectedId, value, value2, moment(value3))
              } else {
                dispatchAddStoryboardDetail(id, value, value2, moment(value3))
              }
              this.setState({
                promptVisible: false,
                isEditing: false,
              })
            }}/>
          {this.state.isEditing &&
          <Picker
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === 'mod') {
                this.setState({
                  promptVisible: true,
                  isEditing: true,
                })
              } else {
                dispatchRemoveStoryboardDetail(this.state.selectedId)
                this.setState({
                  isEditing: false,
                })
              }
            }}>
            <Picker.Item label="Choose action" value="choose" />
            <Picker.Item label="Modify" value="mod" />
            <Picker.Item label="Delete" value="del" />
          </Picker>
          }
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  details: state.storyboard.storyboardDetails.result.data,
  refreshing: state.storyboard.storyboardDetails.refreshing,
  error: state.storyboard.storyboardDetails.error,
  addDone: state.storyboard.addStoryboardDetails.result.data,
  modifyDone: state.storyboard.modifyStoryboardDetails.result.data,
  removeDone: state.storyboard.removeStoryboardDetails.result.data,
})

const mapDispatchToProps = (dispatch, props) => ({
  loadStoryboardDetails(id) {
    dispatch(getStoryboardDetail(id))
  },
  dispatchAddStoryboardDetail(storyboardId, subject, description, targetDate) {
    dispatch(addStoryboardDetail(storyboardId, subject, description, targetDate))
  },
  dispatchModifyStoryboardDetail(id, subject, description, targetDate) {
    dispatch(modifyStoryboardDetail(id, subject, description, targetDate))
  },
  dispatchRemoveStoryboardDetail(id) {
    dispatch(removeStoryboardDetail(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionList)
