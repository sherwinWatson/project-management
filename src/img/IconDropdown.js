import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

class IconDropdown extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 24 24" style={{ width: this.props.width || 24, height: this.props.height || 24 }}>
        <Path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" fill={this.props.color}/>
        <Path d="M0-.75h24v24H0z" fill="none"/>
      </Svg>
    )
  }
}

IconDropdown.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconDropdown
