import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import styles from './../styles/promptStyles';
import CalendarPicker from 'react-native-calendar-picker'

export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    defaultValue: PropTypes.string,
    defaultValue2: PropTypes.string,
    defaultValue3: PropTypes.string,
    placeholder: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    borderColor: PropTypes.string,
    promptStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    submitButtonTextStyle: PropTypes.object,
    cancelButtonStyle: PropTypes.object,
    cancelButtonTextStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    textInputProps: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    defaultValue: '',
    defaultValue2: '',
    defaultValue3: '',
    cancelText: 'Cancel',
    submitText: 'OK',
    borderColor:'#ccc',
    promptStyle: {},
    titleStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    inputStyle: {},
    onChangeText: () => {},
  };

  state = {
    value: '',
    value2: '',
    value3: null,
    visible: false,
    datePickerVisible: false,
  };

  componentDidMount() {
    this.setState({value: this.props.defaultValue});
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value:defaultValue });
  }

  _onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  };

  _onChangeText2 = (value2) => {
    this.setState({ value2 });
    this.props.onChangeText(value2);
  };

  _onChangeText3 = (value3) => {
    this.setState({ value3 });
    this.props.onChangeText(value3);
  };

  _onSubmitPress = () => {
    const { value, value2, value3 } = this.state;
    this.props.onSubmit(value, value2, value3);
  };

  _onCancelPress = () => {
    this.props.onCancel();
  };

  _onDatePress = () => {
    this.setState({datePickerVisible: true})
  };

  close = () => {
    this.setState({visible: false});
  };

  calendarClose = () => {
    this.setState({datePickerVisible: false});
  };

  _renderDialog = () => {
    const {
      title,
      placeholder,
      placeholder2,
      placeholder3,
      defaultValue,
      defaultValue2,
      defaultValue3,
      cancelText,
      submitText,
      borderColor,
      promptStyle,
      titleStyle,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
      inputStyle,
    } = this.props
    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay}/>
        <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
          <View style={[styles.dialogTitle, { borderColor }]}>
            <Text style={[styles.dialogTitleText, titleStyle]}>
              { title }
            </Text>
          </View>
          <View style={styles.dialogBody}>
            <TextInput
              style={[styles.dialogInput, inputStyle]}
              defaultValue={defaultValue}
              onChangeText={this._onChangeText}
              placeholder={placeholder}
              autoFocus={true}
              underlineColorAndroid="white"
              {...this.props.textInputProps} />
            <TextInput
              style={[styles.dialogInput, inputStyle]}
              defaultValue={defaultValue2}
              onChangeText={this._onChangeText2}
              placeholder={placeholder2}
              autoFocus={true}
              underlineColorAndroid="white"
              {...this.props.textInputProps} />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.dialogInput, inputStyle, {flex: 1}]}
                defaultValue={defaultValue3}
                placeholder={placeholder3}
                autoFocus={true}
                editable={false}
                value={this.state.value3}
                underlineColorAndroid="white"
                {...this.props.textInputProps} />
              <Button onPress={() => {
                this.setState({datePickerVisible: true})
                Keyboard.dismiss()
              }} title="📅"/>
            </View>
          </View>
          <View style={[styles.dialogFooter, { borderColor }]}>
            <TouchableWithoutFeedback onPress={this._onCancelPress}>
              <View style={[styles.dialogAction, buttonStyle, cancelButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, cancelButtonTextStyle]}>
                  {cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._onSubmitPress}>
              <View style={[styles.dialogAction, buttonStyle, submitButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, submitButtonTextStyle]}>
                  {submitText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal onRequestClose={() => this.close()} transparent={false} visible={this.props.visible}>
        {this._renderDialog()}
        {this.state.datePickerVisible &&
          <CalendarPicker
            onDateChange={(date) => {
              this.setState({
                value3: date.format('DD MMM YYYY'),
                datePickerVisible: false,
              })
            }}
          />
        }
      </Modal>
    );
  }
};
