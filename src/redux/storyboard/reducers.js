import {
  handleRequestReducer,
  handleRequestErrorReducer,
  handleRequestSuccessReducer,
} from './../../helpers/reducers'

import {
  GET_STORYBOARD,
  GET_STORYBOARD_SUCCESS,
  GET_STORYBOARD_ERROR,
  ADD_STORYBOARD,
  ADD_STORYBOARD_SUCCESS,
  ADD_STORYBOARD_ERROR,
  GET_STORYBOARD_DETAIL,
  GET_STORYBOARD_DETAIL_SUCCESS,
  GET_STORYBOARD_DETAIL_ERROR,
  ADD_STORYBOARD_DETAIL,
  ADD_STORYBOARD_DETAIL_SUCCESS,
  ADD_STORYBOARD_DETAIL_ERROR,
  MODIFY_STORYBOARD_DETAIL,
  MODIFY_STORYBOARD_DETAIL_SUCCESS,
  MODIFY_STORYBOARD_DETAIL_ERROR,
  REMOVE_STORYBOARD_DETAIL,
  REMOVE_STORYBOARD_DETAIL_SUCCESS,
  REMOVE_STORYBOARD_DETAIL_ERROR,
} from './actions'

const initialState = {
  storyboards: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  storyboardDetails: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  addStoryboard: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  addStoryboardDetails: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  modifyStoryboardDetails: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  removeStoryboardDetails: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORYBOARD:
      return handleRequestReducer(state, action, 'storyboards')

    case GET_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'storyboards')

    case GET_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'storyboards')

    case ADD_STORYBOARD:
      return handleRequestReducer(state, action, 'addStoryboard')

    case ADD_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'addStoryboard')

    case ADD_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'addStoryboard')

    case GET_STORYBOARD_DETAIL:
      return handleRequestReducer(state, action, 'storyboardDetails')

    case GET_STORYBOARD_DETAIL_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'storyboardDetails')

    case GET_STORYBOARD_DETAIL_ERROR:
      return handleRequestErrorReducer(state, action, 'storyboardDetails')

    case ADD_STORYBOARD_DETAIL:
      return handleRequestReducer(state, action, 'addStoryboardDetails')

    case ADD_STORYBOARD_DETAIL_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'addStoryboardDetails')

    case ADD_STORYBOARD_DETAIL_ERROR:
      return handleRequestErrorReducer(state, action, 'addStoryboardDetails')

    case MODIFY_STORYBOARD_DETAIL:
      return handleRequestReducer(state, action, 'modifyStoryboardDetails')

    case MODIFY_STORYBOARD_DETAIL_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'modifyStoryboardDetails')

    case MODIFY_STORYBOARD_DETAIL_ERROR:
      return handleRequestErrorReducer(state, action, 'modifyStoryboardDetails')

    case REMOVE_STORYBOARD_DETAIL:
      return handleRequestReducer(state, action, 'removeStoryboardDetails')

    case REMOVE_STORYBOARD_DETAIL_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'removeStoryboardDetails')

    case REMOVE_STORYBOARD_DETAIL_ERROR:
      return handleRequestErrorReducer(state, action, 'removeStoryboardDetails')

    default:
      return state
  }
}
