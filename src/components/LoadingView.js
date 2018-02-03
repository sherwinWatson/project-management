import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Platform } from 'react-native'
import Modal from 'react-native-modal'
import color from './../styles/color'
// import Animation from 'lottie-react-native'
import { Icon, Button, Header } from 'native-base'
// import { back } from './../redux/navigation/actions'

const style = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

class LoadingView extends React.Component {
  componentWillReceiveProps(nextProps) {
    // if (this.animation) {
    //   if (nextProps.isShown) {
    //     this.animation.play()
    //   } else {
    //     this.animation.reset()
    //   }
    // }
  }

  // componentDidMount() {
  //   const { isShown, isModal } = this.props
  //   if (!isModal && isShown && this.animation) {
  //     this.animation.play()
  //   }
  // }

  renderContent() {
    const { isModal, solid, noBack } = this.props
    return (
      <View style={[{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: this.props.solid ? color.pale_white : '#FFFFFF80',
      }, this.props.isShown ? style : null]}>

        <View style={{
          width: this.props.isShown ? 72 : 0,
          height: this.props.isShown ? 72 : 0,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center' }}
        >
        </View>
      </View>
    )
  }

  render() {
    if (this.props.isModal) {
      return (
        <Modal
          backdropOpacity={0}
          isVisible={this.props.isShown}
          style={{ margin: 0 }}
          onRequestClose={() => {
            this.props.onBackPressed
          }}>
          {this.renderContent()}
        </Modal>
      )
    }

    return this.renderContent()
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  // goBack: () => {
  //   dispatch(back())
  // },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingView)

LoadingView.propTypes = {
  isShown: PropTypes.bool.isRequired,
  isModal: PropTypes.bool.isRequired,
  onBackPressed: PropTypes.func,
}

LoadingView.defaultProps = {
  isShown: false,
  isModal: true,
  noBack: false,
}
