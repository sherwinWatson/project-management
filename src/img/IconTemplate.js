import React from 'react'
import Svg, { Rect } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconTemplate extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Rect x="0.16" y="16.78" width="31.81" height="14.63" rx="1.99" ry="1.99"/>
        <Rect x="0.16" y="-0.06" width="14.63" height="14.75" rx="1.99" ry="1.99"/>
        <Rect x="17.21" y="-0.06" width="14.63" height="14.75" rx="1.99" ry="1.99"/>
      </Svg>
    )
  }
}

IconTemplate.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconTemplate
