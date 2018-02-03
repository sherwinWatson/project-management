import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

const font = {
  'bold': {
    fontFamily: isIOS ? 'System' : 'paprika_bold',
    fontWeight: isIOS ? 'bold' : 'normal',
  },
  'bold_italic': {
    fontFamily: isIOS ? 'System' : 'paprika_bold_italic',
    fontWeight: isIOS ? 'bold' : 'normal',
    fontStyle: isIOS ? 'italic' : 'normal',
  },
  'italic': {
    fontFamily: isIOS ? 'System' : 'paprika_italic',
    fontStyle: isIOS ? 'italic' : 'normal',
  },
  'regular': {
    fontFamily: isIOS ? 'System' : 'paprika_regular',
    fontWeight: 'normal',
  },
  'light': {
    fontFamily: isIOS ? 'System' : 'paprika_light',
    fontWeight: isIOS ? '300' : 'normal',
  },
  'light_italic': {
    fontFamily: isIOS ? 'System' : 'paprika_light_italic',
    fontWeight: isIOS ? '300' : 'normal',
    fontStyle: isIOS ? 'italic' : 'normal',
  },
  'semi_bold': {
    fontFamily: isIOS ? 'System' : 'paprika_bold',
    fontWeight: isIOS ? '400' : 'normal',
  },
}

export default font
