import { combineForms } from 'react-redux-form'
import user from './../redux/user/reducers'
import storyboard from './../redux/storyboard/reducers'

export default {
  user,
  storyboard,
  form: combineForms({
    login: {
      username: '',
      password: '',
    },
  }, 'form'),
}
