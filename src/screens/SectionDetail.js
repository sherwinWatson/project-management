import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headerConfig } from '../config/headerConfig';
import { Button, StyleProvider, Container, List, ListItem, Thumbnail } from 'native-base';
import TitleView from '../components/TitleView';
import theme from '../styles/theme/index';
import color from '../styles/color';
import margin from '../styles/margin';

class SectionDetail extends Component {
  static navigationOptions = headerConfig('', true);

  componentWillMount() {
    console.log('component will mount section details')
    
    const { sectionId, section } = this.props.navigation.state.params
    console.log(sectionId)
    console.log(section)
  }

  render() {
    const { sectionId, section } = this.props.navigation.state.params
    const { navigation } = this.props
    const { textStyle, listItemStyle } = styles
    const task = [
      {
        title: 'Filosofi',
        status: 'In Progress',
        date: '2018-07-07'
      },
      {
        title: 'Filosofi2',
        status: 'In Progress',
        date: '2018-07-07'
      },
      {
        title: 'Filosofi3',
        status: 'In Progress',
        date: '2018-07-07'
      },
    ]

    const getThumbnail = (users) => {
      return users.imageUrl
        ? { uri: users.imageUrl }
        : require('./../img/no_avatar.png')
    }

    const renderSelectedListItem = (users) => {
      return (
        <View style={{margin: margin.s12, alignItems: 'center'}}>
          <Thumbnail style={{width: 50, height: 50}} source={getThumbnail(users)} />
          <Text style={{marginTop: margin.s4}}>{users.name}</Text>
        </View>
      )
    }

    const renderSelectedTask = (task) => {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: margin.s4}}>
          <Text>{task.title}</Text>
          <Text>{task.status}</Text>
          <Text>{task.date}</Text>
        </View>
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container style={{backgroundColor: color.white}}>
          <View style={{backgroundColor: color.black, paddingHorizontal: margin.s8, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{margin: margin.s4, flexDirection: 'row'}}>
              <Text style={{color: color.white}}>{section.subject}</Text>
              <Text style={{color: color.light_grey}}> ( {parseInt(section.portion)}% )</Text>
            </View>
            <Text style={{margin: margin.s4, color: color.white}}>{section.target_date}</Text>
          </View>

          <List style={{margin: margin.s12}}>
            <ListItem style={listItemStyle}>
              <Text>{section.description}</Text>
            </ListItem>
            <ListItem style={listItemStyle}>
              <View>
                <Text>People on this card</Text>
                <View style={{flexDirection: 'row', marginRight: margin.s4}}>
                  <List
                    horizontal={true}
                    dataArray={section.users.data}
                    renderRow={renderSelectedListItem}
                  />
                </View>
              </View>
            </ListItem>
            <ListItem style={listItemStyle} last>
              <List 
                dataArray={task}
                renderRow={renderSelectedTask}
              />
            </ListItem>
          </List>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  listItemStyle: {
    paddingVertical: margin.s16
  },
  textStyle: {
    color: color.white
  }
}

export default SectionDetail;