import React from 'react'
import Svg, { Path, G, Rect } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconBlank extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Path d="M26.06,8.24H20V1.9l3,3.17Zm0,0"/>
        <Path d="M4.12,32V0H17.44V9.58a1.32,1.32,0,0,0,1.28,1.35h9.16V32Zm0,0"/>
      </Svg>
    )
  }
}

IconBlank.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconBlank
