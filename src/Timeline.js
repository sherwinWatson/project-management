import React from 'react'
import { connect } from 'react-redux'
import TimelineComponent from 'react-native-timeline-listview'
import {StyleSheet, Platform, Picker} from 'react-native'
import {getStoryboardDetail, addStoryboardDetail, modifyStoryboardDetail, removeStoryboardDetail} from './redux/storyboard/actions'
import LoadingView from './components/LoadingView'
import { View, StyleProvider, Container, Content, Button, Icon } from 'native-base'
import theme from './styles/theme'
import color from './styles/color'
import moment from 'moment'
import TitleView from './components/TitleView'
import Prompt from './components/Prompt2'
import ActionButton from 'react-native-action-button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  timeline: {
    flex: 1,
    marginHorizontal: 20,
  },
})

class Timeline extends React.Component {
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
    headerTitle: <TitleView title={'Detail'} />,
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

    const data = details.map((item) => ({
      id: item.id,
      time: item.target_date ? moment(item.target_date).format('DD MMM') : 'n/a',
      title: item.subject,
      description: item.details,
    }))

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={refreshing} solid />
          <TimelineComponent
            style={styles.timeline}
            data={data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth: 72, marginTop: -5}}
            timeStyle={{textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13, overflow: 'hidden'}}
            descriptionStyle={{color: 'gray'}}
            options={{
              style: {paddingTop: 5},
            }}
            onEventPress={(e) => {
              this.setState({
                selectedId: e.id,
                isEditing: true,
                defaultValue: e.title,
                defaultValue2: e.description,
                defaultValue3: e.time,
              })
            }}
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
)(Timeline)
