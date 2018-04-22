import React from 'react'
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './../styles/promptStyles'
import IconTemplate from '../img/IconTemplate'
import margin from '../styles/margin'
import color from '../styles/color'
import IconBlank from '../img/IconBlank'

class NewProject extends React.Component {
  state = {
    value: '',
    visible: false,
  };

  componentDidMount() {
    this.setState({value: this.props.defaultValue});
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value:defaultValue });
  }

  render() {
    const {
      title,
      promptStyle,
      titleStyle,
      navigation,
    } = this.props
    return (
      <Modal onRequestClose={() => this.close()} transparent={true} visible={this.props.visible}>
        <View style={styles.dialog} key="prompt">
          <View style={styles.dialogOverlay}/>
          <View style={[styles.dialogContent, promptStyle]}>
            <View style={[styles.dialogTitle ]}>
              <Text style={[styles.dialogTitleText, titleStyle]}>
                { title }
              </Text>
            </View>
            <View style={styles.dialogBody}>
              <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: margin.s12}}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <IconTemplate color={color.black} width={margin.s48} height={margin.s48}/>
                  <Text style={{color: color.defaultText, marginTop: margin.s12}}>Template</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <IconBlank color={color.black} width={margin.s48} height={margin.s48}/>
                  <Text style={{color: color.defaultText, marginTop: margin.s12}}>Blank</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default NewProject
