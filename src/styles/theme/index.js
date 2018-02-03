import { Platform } from 'react-native'
import _ from 'lodash'
import headerTheme from './../../../native-base-theme/components/Header'
import containerTheme from './../../../native-base-theme/components/Container'
import contentTheme from './../../../native-base-theme/components/Content'
import buttonTheme from './../../../native-base-theme/components/Button'
import titleTheme from './../../../native-base-theme/components/Title'
import inputGroupTheme from './../../../native-base-theme/components/InputGroup'
import badgeTheme from './../../../native-base-theme/components/Badge'
import checkBoxTheme from './../../../native-base-theme/components/CheckBox'
import cardTheme from './../../../native-base-theme/components/Card'
import radioTheme from './../../../native-base-theme/components/Radio'
import h3Theme from './../../../native-base-theme/components/H3'
import h2Theme from './../../../native-base-theme/components/H2'
import h1Theme from './../../../native-base-theme/components/H1'
import footerTheme from './../../../native-base-theme/components/Footer'
import footerTabTheme from './../../../native-base-theme/components/FooterTab'
import fabTheme from './../../../native-base-theme/components/Fab'
import itemTheme from './../../../native-base-theme/components/Item'
import labelTheme from './../../../native-base-theme/components/Label'
import textAreaTheme from './../../../native-base-theme/components/Textarea'
import textTheme from './../../../native-base-theme/components/Text'
import toastTheme from './../../../native-base-theme/components/Toast'
import tabTheme from './../../../native-base-theme/components/Tab'
import tabBarTheme from './../../../native-base-theme/components/TabBar'
import tabContainerTheme from './../../../native-base-theme/components/TabContainer'
import viewTheme from './../../../native-base-theme/components/View'
import tabHeadingTheme from './../../../native-base-theme/components/TabHeading'
import iconTheme from './../../../native-base-theme/components/Icon'
import inputTheme from './../../../native-base-theme/components/Input'
import segmentTheme from './../../../native-base-theme/components/Segment'
import spinnerTheme from './../../../native-base-theme/components/Spinner'
import cardItemTheme from './../../../native-base-theme/components/CardItem'
import listItemTheme from './../../../native-base-theme/components/ListItem'
import formTheme from './../../../native-base-theme/components/Form'
import separatorTheme from './../../../native-base-theme/components/Separator'
import variables, { myText, myButton, myHeader, myRadio, myContainer } from './theme'

const theme = {
  variables,
  'NativeBase.Left': {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  'NativeBase.Right': {
    'NativeBase.Button': {
      alignSelf: null,
    },
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  'NativeBase.Body': {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },

  'NativeBase.Header': {
    ...headerTheme(variables),
    ...myHeader,
  },

  'NativeBase.Button': {
    ...buttonTheme(variables),
    ...myButton,
  },

  'NativeBase.Title': {
    ...titleTheme(variables),
  },

  'NativeBase.InputGroup': {
    ...inputGroupTheme(variables),
  },

  'NativeBase.Input': {
    ...inputTheme(variables),
  },

  'NativeBase.Badge': {
    ...badgeTheme(variables),
  },

  'NativeBase.CheckBox': {
    ...checkBoxTheme(variables),
  },

  'NativeBase.Radio': {
    ...radioTheme(variables),
    ...myRadio,
  },

  'NativeBase.Card': {
    ...cardTheme(),
  },

  'NativeBase.CardItem': {
    ...cardItemTheme(variables),
    '.cardBody': {
      padding: -5,
      'NativeBase.Text': {
        marginTop: 5,
        ...myText,
      },
    },
    flexDirection: 'row',
    alignItems: 'center',
  },

  'NativeBase.CardItem1': {
    ...cardItemTheme(variables),
  },

  'NativeBase.Toast': {
    ...toastTheme(variables),
  },

  'NativeBase.H1': {
    ...h1Theme(variables),
  },
  'NativeBase.H2': {
    ...h2Theme(variables),
  },
  'NativeBase.H3': {
    ...h3Theme(variables),
  },
  'NativeBase.Form': {
    ...formTheme(variables),
  },

  'NativeBase.Container': {
    ...containerTheme(variables),
    ...myContainer,
  },
  'NativeBase.Content': {
    ...contentTheme(variables),
  },

  'NativeBase.Footer': {
    ...footerTheme(variables),
  },

  'NativeBase.Tabs': {
    flex: 1,
  },

  'NativeBase.FooterTab': {
    ...footerTabTheme(variables),
  },

  'NativeBase.ListItem': {
    ...listItemTheme(variables),
    'NativeBase.CheckBox': {
      marginLeft: -10,
      marginRight: 10,
    },
    'NativeBase.Text': {
      '.note': {
        color: variables.listNoteColor,
        fontWeight: '200',
      },
      alignSelf: 'center',
      ...myText,
    },
  },

  'NativeBase.ListItem1': {
    ...listItemTheme(variables),
  },

  'NativeBase.Icon': {
    ...iconTheme(variables),
  },
  'NativeBase.IconNB': {
    ...iconTheme(variables),
  },
  'NativeBase.Text': {
    ...textTheme(variables),
    ...myText,
  },
  'NativeBase.Spinner': {
    ...spinnerTheme(variables),
  },

  'NativeBase.Fab': {
    ...fabTheme(variables),
  },

  'NativeBase.Item': {
    ...itemTheme(variables),
  },

  'NativeBase.Label': {
    ...labelTheme(variables),
  },

  'NativeBase.Textarea': {
    ...textAreaTheme(variables),
  },

  'NativeBase.PickerNB': {
    'NativeBase.Button': {
      'NativeBase.Text': {
      },
    },
  },

  'NativeBase.Tab': {
    ...tabTheme(variables),
  },

  'NativeBase.Segment': {
    ...segmentTheme(variables),
  },

  'NativeBase.STabs': {
    flex: 1,
  },

  'NativeBase.TabBar': {
    ...tabBarTheme(variables),
  },
  'NativeBase.ViewNB': {
    ...viewTheme(variables),
  },
  'NativeBase.TabHeading': {
    ...tabHeadingTheme(variables),
  },
  'NativeBase.TabContainer': {
    ...tabContainerTheme(variables),
  },
  'NativeBase.Switch': {
    marginVertical: -5,
  },
  'NativeBase.Separator': {
    ...separatorTheme(variables),
  },
  'NativeBase.Thumbnail': {
    '.square': {
      borderRadius: 0,
    },
    '.small': {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    '.large': {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    width: 56,
    height: 56,
    borderRadius: 28,
  },

}

const cssifyTheme = (grandparent, parent, parentKey) => {
  _.forEach(parent, (style, styleName) => {
    if (styleName.indexOf('.') === 0 && parentKey && parentKey.indexOf('.') === 0) {
      if (grandparent) {
        if (!grandparent[styleName]) {
          grandparent[styleName] = {}
        } else {
          grandparent[styleName][parentKey] = style
        }
      }
    }
    if (style && typeof style === 'object') {
      cssifyTheme(parent, style, styleName)
    }
  })
}

cssifyTheme(null, theme, null)

export default theme
