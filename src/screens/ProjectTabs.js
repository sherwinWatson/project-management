import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab, TabHeading } from 'native-base'
import theme from './../styles/theme'
import Storyboard from './Storyboard'
import SectionList from './SectionList'
import color from '../styles/color'
import {headerConfig} from '../config/headerConfig'

class MainTabs extends React.Component {
  static navigationOptions = headerConfig('Project', true)

  render() {
    const {
      navigation,
    } = this.props

    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: color.black}}>
          <Tabs initialPage={0} >
            <Tab
              heading={ <TabHeading><Text style={{color: color.white}}>MAIN</Text></TabHeading>}
            >
              <SectionList navigation={navigation} id={this.props.navigation.state.params.id}/>
            </Tab>
            <Tab
              heading={ <TabHeading><Text style={{color: color.white}}>TIMELINE</Text></TabHeading>}
            >
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
