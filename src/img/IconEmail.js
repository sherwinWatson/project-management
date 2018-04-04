import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconEmail extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Path fill={this.props.color} d="M28.8,3.2H3.2A3.2,3.2,0,0,0,0,6.4L0,25.6a3.21,3.21,0,0,0,3.2,3.2H28.8A3.21,3.21,0,0,0,32,25.6V6.4A3.21,3.21,0,0,0,28.8,3.2Zm0,22.4H3.2V9.6l12.8,8,12.8-8ZM16,14.4,3.2,6.4H28.8Z"/>
      </Svg>
    )
  }
}

IconEmail.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconEmail
