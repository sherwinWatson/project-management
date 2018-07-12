import React from 'react'
import { connect } from 'react-redux'
import TimelineComponent from 'react-native-timeline-listview'
import {StyleSheet, Platform, Picker} from 'react-native'
import LoadingView from './../components/LoadingView'
import { View, StyleProvider, Container, Content, Button, Icon, Text } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import moment from 'moment'
import TitleView from './../components/TitleView'

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
    backgroundColor: color.black,
  },
})

class Timeline extends React.Component {
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


  componentWillReceiveProps(nextProps) {
    const {loadStoryboardDetails, addDone, modifyDone, removeDone} = this.props
    const {id} = this.props.navigation.state.params

    if (!_.isEqual(addDone, nextProps.addDone) || !_.isEqual(modifyDone, nextProps.modifyDone) || !_.isEqual(removeDone, nextProps.removeDone)) {
      loadStoryboardDetails(id)
    }
  }

  render() {
    const { id, details, refreshing } = this.props

    const data = details.map((item) => ({
      id: item.id,
      time: item.target_date ? moment(item.target_date).format('DD MMM') : 'n/a',
      title: item.subject,
      description: item.description,
      icon: item.isDone ? require('./../img/ic_done_white.png') : null,
    }))

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={refreshing} solid />
          {details[0].target_date &&
            <Text>{moment(details[0].target_date).format('DD MMM')}</Text>
          }
          <TimelineComponent
            style={styles.timeline}
            data={data}
            columnFormat={'two-column'}
            separator={false}
            timeStyle={{textAlign: 'center', color: color.transparent}}
            titleStyle={{textAlign: 'center', fontSize: 12, color: color.white}}
            showTime={false}
            descriptionStyle={{color: color.white, fontSize: 8, textAlign: 'center'}}
            options={{
              style: {paddingTop: 5},
            }}
            onEventPress={(e) => {
            }}
          />
          {details[details.length - 1].target_date &&
            <Text>{moment(details[details.length - 1].target_date).format('DD MMM')}</Text>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline)
