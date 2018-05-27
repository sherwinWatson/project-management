import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import Svg, { Path, Polygon } from 'react-native-svg'

class IconBack extends React.Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Svg viewBox="0 0 306 306" style={{ width: this.props.width || 20, height: this.props.height || 20 }}>
          <Polygon
            points="247.35,270.3 130.05,153 247.35,35.7 211.65,0 58.65,153 211.65,306"
            fill={this.props.color}
          />
        </Svg>
      )
    }
    return (
      <Svg viewBox="0 0 408 408" style={{ width: this.props.width || 20, height: this.props.height || 20 }}>
        <Path
          d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}

IconBack.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconBack
