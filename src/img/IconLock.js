import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconLock extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Path fill={this.props.color} d="M25.14,10.67H23.62v-3a7.62,7.62,0,0,0-15.24,0v3H6.86a3.06,3.06,0,0,0-3,3V29a3.06,3.06,0,0,0,3,3H25.14a3.06,3.06,0,0,0,3-3V13.71A3.06,3.06,0,0,0,25.14,10.67ZM16,24.38a3,3,0,1,1,3-3A3.06,3.06,0,0,1,16,24.38Zm4.72-13.71H11.28v-3a4.72,4.72,0,0,1,9.45,0Z"/>
      </Svg>
    )
  }
}

IconLock.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconLock
