import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  dialog: {
    flex: 1,
    alignItems: 'center',
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dialogContent: {
    elevation: 5,
    marginTop: 180,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  dialogContentWithDatePicker: {
    elevation: 5,
    marginTop: 40,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  dialogTitle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  dialogTitleText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  dialogBody: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  dialogInput: {
    height: 50,
    fontSize: 18,
    borderBottomWidth: 0.5,
  },
  dialogFooter: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  dialogAction: {
    flex: 1,
    padding: 15,
  },
  dialogActionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#006dbf',
  },
})
