// import nativeBaseTheme from './../../../native-base-theme/variables/platform.js'
import { Platform, Dimensions, PixelRatio } from 'react-native'
import color from './../color'
import margin from './../margin'
import font from './../font'

const platform = Platform.OS

const light = '300'
const normal = 'normal'
const bold = platform === 'ios' ? '500' : 'bold'
const semibold = '400'
const fontFamily = 'paprika_regular'

export default variables = {
  // ...nativeBaseTheme,
  brandPrimary: color.teal,

  // Header
  toolbarBtnColor: color.toolbarItem,
  toolbarDefaultBg: color.pale_white,
  toolbarTextColor: color.toolbarItem,
  toolbarDefaultBorder: platform === 'ios' ? '#a7a6ab' : color.border,

  // Font || Text
  fontFamily: platform === 'ios' ? 'System' : fontFamily,
  btnFontFamily: platform === 'ios' ? 'System' : fontFamily,
  fontSizeBase: margin.body,
  textColor: color.defaultText,
  inverseTextColor: color.white,

  // Input
  inputFontSize: margin.body,
  inputColor: color.defaultText,
  inputPaddingLeft: 0,

  // Radio
  radioSelectedColorAndroid: color.primary,

  // Title
  titleFontColor: color.toolbarItem,
  titleFontSize: platform === 'ios' ? 18 : 19,

  // Other
  borderRadiusBase: margin.s4,
  contentPadding: margin.s16,
}

export const myText = {
  fontSize: variables.fontSizeBase,
  fontWeight: normal,
  '.display': {
    fontSize: margin.display,
    ...font.regular,
    lineHeight: 38,
  },
  '.title1': {
    fontSize: margin.title1,
    ...font.light,
    lineHeight: 34,
    color: color.defaultText,
  },
  '.title1_regular_teal': {
    fontSize: margin.title1,
    ...font.regular,
    color: color.teal,
  },
  '.title1_bold': {
    fontSize: margin.title1,
    ...font.bold,
    lineHeight: 34,
    color: color.defaultText,
  },
  '.title1_regular': {
    fontSize: margin.title1,
    ...font.regular,
    lineHeight: 34,
    color: color.defaultText,
  },
  '.title1_dark_bold': {
    fontSize: margin.title1,
    ...font.bold,
    lineHeight: 34,
    color: color.darkText,
  },
  '.title2': {
    lineHeight: 26,
    fontSize: margin.title2,
    ...font.light,
  },
  '.title3': {
    fontSize: margin.title3,
    ...font.light,
    color: color.defaultText,
  },
  '.title3_semibold': {
    fontSize: margin.title3,
    ...font.semi_bold,
    color: color.defaultText,
  },
  '.headline': {
    lineHeight: 22,
    fontSize: margin.headline,
    ...font.bold,
    color: color.darkText,
  },
  '.callout': {
    fontSize: margin.callout,
    ...font.bold,
    color: color.white,
  },
  '.body': {
    lineHeight: 18,
    fontSize: variables.fontSizeBase,
    ...font.regular,
    color: variables.textColor,
  },
  '.bold_body': {
    fontSize: variables.fontSizeBase,
    ...font.bold,
    color: variables.textColor,
  },
  '.subhead': {
    fontSize: margin.subhead,
    ...font.bold,
    color: variables.textColor,
  },
  '.subbody': {
    lineHeight: 17,
    fontSize: margin.subbody,
    ...font.regular,
    color: variables.textColor,
  },
  '.subbody_white': {
    lineHeight: 17,
    fontSize: margin.subbody,
    ...font.regular,
    color: color.white,
  },
  '.caption1': {
    lineHeight: 15,
    fontSize: margin.caption1,
    ...font.bold,
    color: color.defaultText,
  },
  '.caption': {
    fontSize: margin.subbody,
    ...font.bold,
    color: color.defaultText,
  },
  '.offer': {
    fontSize: margin.headline,
    ...font.bold,
    color: color.teal,
  },
}

export const myButton = {
  backgroundColor: color.primary,
  elevation: 0,
  paddingTop: margin.s12,
  paddingBottom: margin.s12,
  paddingRight: margin.s16,
  paddingLeft: margin.s16,
  shadowColor: undefined,
  shadowOffset: undefined,
  shadowOpacity: undefined,
  shadowRadius: undefined,
  'NativeBase.Text': {
    marginLeft: 0,
    marginRight: 0,
    color: variables.inverseTextColor,
    fontSize: variables.btnTextSize,
    lineHeight: variables.btnLineHeight,
    ...myText['.callout'],
  },
  '.border': {
    borderWidth: 1,
    borderColor: color.defaultText,
    backgroundColor: color.transparent,
    'NativeBase.Text': {
      color: color.default_text,
    },
  },
}

export const myRadio = {
}

export const myHeader = {
  borderBottomWidth: platform === 'android' && Platform.Version >= 21 ? 0 : 1 / PixelRatio.getPixelSizeForLayoutSize(1),
}

export const myContainer = {
  height: undefined,
  backgroundColor: color.pale_white,
}
