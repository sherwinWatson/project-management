import { StackNavigator } from 'react-navigation'
import Timeline from './screens/Timeline'
import Login from './screens/Login'
import MainTabs from './screens/MainTabs'
import Welcome from './screens/Welcome'
import SignUp from './screens/SignUp'
import Contacts from './screens/Contacts'
import NewProject from './screens/NewProject'
import SectionList from './screens/SectionList'
import TemplateList from './screens/TemplateList'
import ProjectTabs from './screens/ProjectTabs'
import StoryboardDetail from './screens/StoryboardDetail'

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
    Contacts: { screen: Contacts },
    NewProject: { screen: NewProject },
    SectionList: { screen: SectionList },
    TemplateList: { screen: TemplateList },
    ProjectTabs: { screen: ProjectTabs },
    StoryboardDetail: { screen: StoryboardDetail },
  }, {
    headerMode: 'screen',
  }
)

export default {
  AuthenticatedNavigator: AuthenticatedNavigator,
  UnAuthenticatedNavigator: UnAuthenticatedNavigator,
}
