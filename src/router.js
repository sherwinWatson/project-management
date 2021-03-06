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
import SectionDetail from './screens/SectionDetail'
import NewTask from './screens/NewTask'
import QRCode from './screens/QRCode'
import NewSection from './screens/NewSection'
import AddContacts from './screens/AddContacts'

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
    NewSection: { screen: NewSection },
    TemplateList: { screen: TemplateList },
    ProjectTabs: { screen: ProjectTabs },
    StoryboardDetail: { screen: StoryboardDetail },
    SectionDetail: { screen: SectionDetail },
    NewTask: { screen: NewTask },
    QRCode: { screen: QRCode },
    AddContacts: { screen: AddContacts },
  }, {
    headerMode: 'screen',
  }
)

export default {
  AuthenticatedNavigator: AuthenticatedNavigator,
  UnAuthenticatedNavigator: UnAuthenticatedNavigator,
}
