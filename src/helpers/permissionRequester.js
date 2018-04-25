import { PermissionsAndroid } from 'react-native'

export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera')
    } else {
      console.log('Camera permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}

export async function requestContactsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Please grant KAMI Contacts Permission',
        'message': 'KAMI needs access to your contacts ' +
        'to add new members.',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 1
    }
    return 0
  } catch (err) {
    console.warn(err)
  }
  return 0
}
