import React, { Component } from  'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { Spinner } from 'native-base';
import color from './../styles/color';

export const Loader = props => {
  const { loading } = props;
  const { modalBackground, activityIndicatorWrapper } = styles;

  return (
    <Modal 
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={modalBackground}>
        <View style={activityIndicatorWrapper}>
          <Spinner
            animating={loading}
            color={color.light_grey}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = {
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}