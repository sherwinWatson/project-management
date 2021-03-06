import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab, Card, CardItem, Icon } from 'native-base'
import {Platform, RefreshControl, View, TouchableOpacity} from 'react-native'
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
import ActionButton from 'react-native-action-button'
import LoadingView from './../components/LoadingView'
import {headerConfig} from './../config/headerConfig'

class SectionList extends React.Component {
  static navigationOptions = headerConfig('Sections', true)
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
    const { id, details, refreshing, navigation } = this.props

    const styles = {
      container: {
        marginHorizontal: margin.s12,
        marginVertical: margin.s4,
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
      },
      contentBody: {
        flexShrink: 1,
        justifyContent: 'space-between',
      },
    }

    const renderRefreshControl = () => {
      const {loadStoryboardDetails} = this.props

      return (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadStoryboardDetails(id)}
        />
      )
    }

    const getThumbnail = (data) => {
      return data.imageUrl
        ? { uri: data.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderSelectedListItem = (data) => {
      return (
        <View style={{margin: margin.s12, alignItems: 'center'}}>
          <Thumbnail style={{width: 50, height: 50}} source={getThumbnail(data)} />
          <Text style={{marginTop: margin.s4}}>{data.name}</Text>
        </View>
      )
    }

    const openDetail = _.throttle((navigationn, data) => {
      navigationn.navigate('SectionDetail', { sectionId: data.section_id })
    }, 1200, {trailing: false})

    const renderListItem = (data) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => openDetail(navigation, data)} avatar>
          <View style={{...styles.content}}>
            <Card style={{padding: margin.s12}}>
              <CardItem header>
                <Text style={{flexShrink: 1, fontWeight: 'bold'}} numberOfLines={1}>{data.subject}</Text>
                <View style={{flex: 1, marginHorizontal: margin.s4}}/>
                <Text caption>{moment(data.target_date).format('DD/MM/YYYY')}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <View style={{flexDirection: 'row', marginRight: margin.s4}}>
                    <List
                      horizontal={true}
                      dataArray={data.users.data}
                      renderRow={renderSelectedListItem}
                    />
                  </View>
                </Body>
                <View/>
                <View>
                  <Text caption style={{flex: 1, textAlignVertical: 'bottom'}}>Detail</Text>
                </View>
              </CardItem>
            </Card>
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
              navigation.navigate('NewSection', {id: id})
            }}
          />
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
)(SectionList)
