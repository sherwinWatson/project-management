import React from 'react'
import { View, Text, Platform } from 'react-native'
import color from './../styles/color'
import font from './../styles/font'

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  outletLogo: {
    marginRight: 12,
    height: 30,
    borderRadius: 15,
    width: 30,
  },
  dropdown: {
    color: color.teal,
    paddingLeft: 8,
    alignSelf: 'center',
  },
  spacer: {
    flex: 0.2,
  },
  title: {
    maxWidth: 200,
    textAlign: 'center',
    alignSelf: 'center',
    color: color.toolbarItem,
    ...font.bold,
    fontSize: Platform.OS === 'ios' ? 17 : 18,
  },
}

export default class TitleView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spacer}/>
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.spacer}/>
      </View>
    )
  }
}
