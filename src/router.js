import { StackNavigator } from 'react-navigation'
import Timeline from './screens/Timeline'
import Login from './screens/Login'
import MainTabs from './screens/MainTabs'
import Welcome from './screens/Welcome'
import SignUp from './screens/SignUp'

const stackNavigator = StackNavigator

const UnAuthenticatedNavigator = stackNavigator(
  {
    Welcome: {screen: Welcome},
    Login: { screen: Login },
    SignUp: {screen: SignUp},
  }, {
    headerMode: 'screen',
  }
)

const AuthenticatedNavigator = stackNavigator(
  {
    Main: { screen: MainTabs },
    Detail: { screen: Timeline },
  }, {
    headerMode: 'screen',
  }
)

export default {
  AuthenticatedNavigator: AuthenticatedNavigator,
  UnAuthenticatedNavigator: UnAuthenticatedNavigator,
}
