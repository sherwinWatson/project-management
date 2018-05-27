import React from 'react'
import { Text, Platform, View } from 'react-native'
import { Icon, Button } from 'native-base'
import color from './../styles/color'
import TitleView from './../components/TitleView'

export const headerConfig = (title, isBack, headerRight) => {
  const left = (goBack) => {
    if (isBack) {
      return (
        <Button transparent onPress={() => goBack()}>
          <Icon style={{ color: color.toolbarItem }} name="arrow-back" />
        </Button>
      )
    }
    return null
  }

  const config = ({ navigation }) => {
    let titleContent
    let headerRightContent
    if (title) {
      titleContent = typeof title === 'function' ? title(navigation) : title
      titleContent = typeof titleContent === 'string' ? <TitleView title={titleContent} /> : titleContent
    }
    if (headerRight) {
      headerRightContent = typeof headerRight === 'function' ? headerRight(navigation) : headerRight
    }
    return {
      headerTitleStyle: {
        alignSelf: 'center',
        color: color.toolbarItem,
      },
      headerStyle: {
        borderBottomWidth: Platform.OS === 'android' && Platform.Version < 21 ? 0.5 : 0,
        borderBottomColor: Platform.OS === 'ios' ? '#a7a6ab' : color.border,
        backgroundColor: color.black,
      },
      headerTitle: titleContent,
      headerLeft: <View>{left(() => {navigation.goBack(null)})}</View>,
      headerRight: headerRightContent ? headerRightContent : <View/>,
      gesturesEnabled: true,
    }
  }
  return config
}
