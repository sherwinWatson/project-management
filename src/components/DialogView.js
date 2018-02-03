import React from 'react'
import { View, TouchableWithoutFeedback, TouchableHighlight, InteractionManager } from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import { Text } from 'native-base'
import color from './../styles/color'
import margin, { screen } from './../styles/margin'

const styles = {
  container: {
    width: screen.width * 6 / 7,
    alignSelf: 'center',
  },
  top: {
    backgroundColor: color.pale_white,
    borderTopLeftRadius: margin.s8,
    borderTopRightRadius: margin.s8,
    padding: margin.s16,
    alignItems: 'center',
  },
  bottom: {
    padding: margin.s16,
    backgroundColor: color.pale_white,
    borderBottomLeftRadius: margin.s12,
    borderBottomRightRadius: margin.s12,
    alignItems: 'center',
  },
  touch: {
    borderBottomLeftRadius: margin.s12,
    borderBottomRightRadius: margin.s12,
  },
  title: {
    color: color.black,
    marginBottom: margin.s4,
    textAlign: 'center',
  },
  message: {
    color: color.darkText,
    textAlign: 'center',
  },
}

export default class DialogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: false,
      title: null,
      message: null,
    }
  }

  _setVisibility = (visibility) => {
    this.setState({
      visibility: visibility,
    })
  }

  _show = (title, message, action) => {
    setTimeout(() => {
      this.setState({
        visibility: true,
        title: title,
        message: message,
        action: () => {
          this._setVisibility(false)
          InteractionManager.runAfterInteractions(() => {
            if (action) {
              action()
            }
          })
        },
      })
    }, 250)
  }

  render() {
    const { title, message, visibility, action } = this.state
    return (
      <Modal
        isVisible={visibility}
        onRequestClose={() => this._setVisibility(false)}
        animationIn='fadeIn'
        animationInTiming={50}
        animationOut='fadeOut'
        animationOutTiming={200}
      >
        <TouchableWithoutFeedback onPress={() => this._setVisibility(false)}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.top}>
                  {(title && title !== message) &&
                    <Text callout style={styles.title}>{title}</Text>
                  }
                  <Text ellipsizeMode='tail' numberOfLines={5} style={styles.message}>{message}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: color.border }} />
                <TouchableHighlight style={styles.touch} onPress={() => action()}>
                  <View style={styles.bottom}>
                    <Text bold_body style={{ color: color.teal }}>OK</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export const transformError = (error) => {
  let title = null
  let message = null
  if (error) {
    title = error.message
    message = error.message
    if (error.errors && error.errors.length) {
      message = error.errors.reduce((prev, now) => prev.concat(now.message), [])
        .join('\n')
    }
  }
  return {
    title,
    message,
  }
}

DialogView.propTypes = {
  message: PropTypes.string,
  tite: PropTypes.string,
}
