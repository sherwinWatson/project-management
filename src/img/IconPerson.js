import React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import PropTypes from 'prop-types'

class IconPerson extends React.Component {
  render() {
    return (
      <Svg viewBox="0 0 32 32" style={{ width: this.props.width || 32, height: this.props.height || 32 }}>
        <Path fill={this.props.color} d="M16,0a8,8,0,1,0,8,8A8,8,0,0,0,16,0Z"/>
        <Path fill={this.props.color} d="M32,28v4H0V28c0-4,6.12-6.55,11.41-7.53l3.33,5.06.41-1.17c-2-2.82-1.32-3.9-.42-4.32.45,0,.87,0,1.27,0s.88,0,1.37,0c.9.42,1.59,1.5-.43,4.31l.39,1.11,3.34-5C25.94,21.48,32,24,32,28Z"/>
      </Svg>
    )
  }
}

IconPerson.propTypes = {
  color: PropTypes.string.isRequired,
}

export default IconPerson
