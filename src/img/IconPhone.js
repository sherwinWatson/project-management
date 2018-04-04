import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconPhone extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Path fill={this.props.color} d="M21.82,0H10.18A4.36,4.36,0,0,0,5.82,4.36V27.64A4.36,4.36,0,0,0,10.18,32H21.82a4.36,4.36,0,0,0,4.36-4.36V4.36A4.36,4.36,0,0,0,21.82,0ZM18.91,29.09H13.09V27.64h5.82Zm4.73-4.36H8.36V4.36H23.64Z"/>
      </Svg>
    )
  }
}

IconPhone.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconPhone
