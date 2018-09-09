import React from 'react'
import { connect } from 'react-redux'
import TimelineComponent from 'react-native-timeline-listview'
import {StyleSheet, Platform, Picker} from 'react-native'
import LoadingView from './../components/LoadingView'
import { View, StyleProvider, Container, Content, Button, Icon, Text } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin, { screen } from './../styles/margin'
import font from './../styles/font'
import moment from 'moment'
import TitleView from './../components/TitleView'

const colors = ['red', 'green', 'orange', 'pink', 'cyan', 'lime', 'blue', 'magenta', 'gray', 'white', 'purple']

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: color.black,
    flexGrow: 1,
  },
  date: {
    backgroundColor: color.black,
    color: color.white,
    fontSize: 20,
    ...font.bold,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.white,
  },
  descriptionText: {
    color: color.lightText,
    fontSize: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    left: screen.width / 2 - 7,
    position: 'absolute',
  },
  largeDot: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    left: screen.width / 2 - 20,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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

  render() {
    const { id, details, refreshing } = this.props

    let data = []
    if (details.length > 0) {
      data = details.map((item) => ({
        time: item.target_date ? moment(item.target_date).format('DD/MM/YYYY') : 'n/a',
        title: item.subject,
        description: item.description,
        icon: item.isDone ? require('./../img/ic_done_white.png') : null,
      }))

      data.push({
        id: 99,
        time: moment(details[details.length - 1].target_date).format('DD/MM/YYYY'),
        title: 'Project Finish',
        percentage: 80, // TODO: implement percentage from server
      })

      data.unshift({
        id: 0,
        time: moment(details[0].target_date).format('DD/MM/YYYY'),
        title: 'Project Start',
        percentage: 0,
      })
    }

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={refreshing} solid />
          {data.length > 0 &&
            <TimelineComponent
              style={styles.timeline}
              data={data}
              columnFormat={'two-column'}
              separator={false}
              options={{
                style: {paddingTop: 5, paddingBottom: 5},
              }}
              onEventPress={(e) => {}}
              lineColor='gray'
              renderDetail={(rowData, sectionId, rowId) => {
                const textAlign = {textAlign: rowId % 2 === 0 ? 'left' : 'right'}
                return (
                  <View style={{marginTop: -12}}>
                    <Text style={[styles.dateText, textAlign]}>{rowData.time}</Text>
                    <Text style={[styles.titleText, textAlign]}>{rowData.title}</Text>
                    <Text style={[styles.descriptionText, textAlign]}>{rowData.description}</Text>
                  </View>
                )
              }}
              renderCircle={(rowData, sectionId, rowId) => {
                if (rowData.id === 0 || rowData.id === 99) {
                  return (
                    <View style={styles.largeDot}>
                      <Text style={{color: color.darkText, fontWeight: 'bold'}}>{rowData.percentage}%</Text>
                    </View>
                  )
                }
                return (
                  <View style={[styles.dot, {backgroundColor: colors[Math.floor(Math.random() * colors.length)]}]}/>
                )
              }}
            />
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

export default connect(
  mapStateToProps,
  null,
)(Timeline)
