import { watchUser } from './user/sagas'
import { watchStoryboard } from './storyboard/sagas'

export default function* rootSaga() {
  yield [
    watchUser(),
    watchStoryboard(),
  ]
}
