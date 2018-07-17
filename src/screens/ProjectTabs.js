import React from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, List, Spinner, Text, ListItem, Button, Thumbnail, Left, Body, Header, Tabs, Tab, TabHeading } from 'native-base'
import theme from './../styles/theme'
import SectionList from './SectionList'
import Timeline from './Timeline'
import TitleView from './../components/TitleView'
import color from '../styles/color'
import {headerConfig} from '../config/headerConfig'

class ProjectTabs extends React.Component {
  static navigationOptions = headerConfig((navigation) => {
    const { data } = navigation.state.params
    return ( 
      <Button transparent onPress={ _.throttle(() => {
        navigation.navigate('StoryboardDetail', { id: data.storyboard_id })
      }, 1200, {trailing: false})}>
      <TitleView title={data.name}/>
    </Button>
    )
  }, true)

  render() {
    const { navigation } = this.props
    const { id, data } = navigation.state.params

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
