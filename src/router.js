import { StackNavigator } from 'react-navigation'
import Timeline from './Timeline'
import Login from './Login'
import Storyboard from './screens/Storyboard'

const stackNavigator = StackNavigator

const UnAuthenticatedNavigator = stackNavigator(
  {
    Login: { screen: Login },
  }, {
    headerMode: 'screen',
  }
)

const AuthenticatedNavigator = stackNavigator(
  {
    Main: { screen: Storyboard },
    Detail: { screen: Timeline },
  }, {
    headerMode: 'screen',
  }
)

export default {
  AuthenticatedNavigator: AuthenticatedNavigator,
  UnAuthenticatedNavigator: UnAuthenticatedNavigator,
}
