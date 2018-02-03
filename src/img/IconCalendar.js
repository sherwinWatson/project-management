import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path, G } from 'react-native-svg'

class IconCalendar extends React.Component {
  render() {
    return (
      <Svg viewBox="5240 -1012 23.789 24" style={{ width: this.props.width || 20, height: this.props.height || 20 }}>
        <Path
          fill={this.props.color}
          d="M30.1,7.053H27.559V5.773a.841.841,0,0,0-1.676,0v1.28H15.477V5.773a.841.841,0,0,0-1.676,0v1.28H11.315A2.425,2.425,0,0,0,8.8,9.373V26.68A2.425,2.425,0,0,0,11.315,29H30.074a2.425,2.425,0,0,0,2.515-2.32V9.373A2.381,2.381,0,0,0,30.1,7.053Zm-10.059,7.44V17.96H16.026V14.493Zm5.434,0V17.96h-4.1V14.493Zm5.463,0V17.96H26.807V14.493ZM14.668,17.96H10.476V14.493h4.191Zm-4.191,1.227h4.191v3.76H10.476Zm5.55,0h4.018v3.76H16.026ZM20.044,24.2v3.253H16.026V24.2Zm1.33,0h4.076v3.253H21.373Zm0-1.227V19.187h4.076v3.76H21.373Zm5.434-3.787h4.133v3.76H26.807ZM11.315,8.6H13.8v1.627a.841.841,0,0,0,1.676,0V8.6H25.882v1.627a.841.841,0,0,0,1.676,0V8.6H30.1a.808.808,0,0,1,.838.773v3.6H10.476v-3.6A.808.808,0,0,1,11.315,8.6Zm-.838,18.08V24.2h4.191v3.253H11.315A.808.808,0,0,1,10.476,26.68Zm19.626.773h-3.3V24.2h4.133v2.48A.808.808,0,0,1,30.1,27.453Z"
          transform={{ translate: '5231.2, -1017' }}
         />
      </Svg>
    )
  }

}

IconCalendar.propTypes = {
  color: PropTypes.string.isRequired || '#42b6ac',
}

export default IconCalendar
