import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab } from 'native-base'
import theme from './../styles/theme'
import Storyboard from './Storyboard'
import Conversation from './Conversation'
import {Platform} from 'react-native'
import color from '../styles/color'
import TitleView from './../components/TitleView'

class MainTabs extends React.Component {
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
    headerTitle: <TitleView title={'KAMI'} />,
    gesturesEnabled: true,
    hasTabs: true,
  }

  render() {
    const {
      navigation,
    } = this.props

    return (
      <StyleProvider style={theme}>
        <Container>
          <Tabs initialPage={0}>
            <Tab heading="BOARD">
              <Storyboard navigation={navigation}/>
            </Tab>
            <Tab heading="PERSONAL CHAT">
              <Storyboard navigation={navigation}/>
            </Tab>
          </Tabs>
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
)(MainTabs)
