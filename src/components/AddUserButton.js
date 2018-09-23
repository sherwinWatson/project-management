import React from 'react'
import { connect } from 'react-redux'
import {Button, Icon} from 'native-base'
import color from '../styles/color'
import {addUserSection} from '../redux/storyboard/actions'

class AddUserButton extends React.Component {
  addNewUserToStoryboard = ({member}) => {
    this.props.dispatchAddUserSection(this.props.navigation.state.params.sectionId, member)
  }

  render() {
    const { navigation } = this.props
    return (
      <Button transparent onPress={() => navigation.navigate('AddContacts', {addNewUserToStoryboard: this.addNewUserToStoryboard})}>
        <Icon style={{ color: color.toolbarItem }} name="md-person-add" />
      </Button>
    )
  }
}

const mapStateToProps = (state) => ({
  userStoryboard: state.storyboard.userStoryboards.result.data,
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddUserSection(sectionId, member) {
    dispatch(addUserSection(sectionId, member))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUserButton)
