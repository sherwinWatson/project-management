import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

class IconClose extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 64 64" style={{ width: this.props.width || 64, height: this.props.height || 64 }}>
        <Path fill={this.props.color}
              d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
      </Svg>
    )
  }
}

IconClose.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconClose
