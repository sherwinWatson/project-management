import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab, TabHeading } from 'native-base'
import theme from './../styles/theme'
import SectionList from './SectionList'
import Timeline from './Timeline'
import color from '../styles/color'
import {headerConfig} from '../config/headerConfig'

class ProjectTabs extends React.Component {
  static navigationOptions = headerConfig('Project', true)

  render() {
    const { navigation } = this.props
    const { id } = navigation.state.params

    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: color.black}}>
          <Tabs initialPage={0} >
            <Tab
              heading={ <TabHeading><Text style={{color: color.white}}>MAIN</Text></TabHeading>}
            >
              <SectionList navigation={navigation} id={id}/>
            </Tab>
            <Tab
              heading={ <TabHeading><Text style={{color: color.white}}>TIMELINE</Text></TabHeading>}
            >
              <Timeline navigation={navigation} id={id}/>
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
)(ProjectTabs)
