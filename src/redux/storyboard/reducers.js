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
  MODIFY_STORYBOARD,
  MODIFY_STORYBOARD_SUCCESS,
  MODIFY_STORYBOARD_ERROR,
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
  GET_TEMPLATE_LIST,
  GET_TEMPLATE_LIST_SUCCESS,
  GET_TEMPLATE_LIST_ERROR,
  GET_USER_STORYBOARD,
  GET_USER_STORYBOARD_SUCCESS,
  GET_USER_STORYBOARD_ERROR,
  ADD_USER_STORYBOARD,
  ADD_USER_STORYBOARD_SUCCESS,
  ADD_USER_STORYBOARD_ERROR,
  GET_ONE_STORYBOARD,
  GET_ONE_STORYBOARD_SUCCESS,
  GET_ONE_STORYBOARD_ERROR,
  GET_ONE_SECTION,
  GET_ONE_SECTION_SUCCESS,
  GET_ONE_SECTION_ERROR,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  GET_USER_BY_CONTACT,
  GET_USER_BY_CONTACT_SUCCESS,
  GET_USER_BY_CONTACT_ERROR,
  ADD_STORYBOARD_BY_TEMPLATE,
  ADD_STORYBOARD_BY_TEMPLATE_SUCCESS,
  ADD_STORYBOARD_BY_TEMPLATE_ERROR,
  ADD_USER_SECTION,
  ADD_USER_SECTION_SUCCESS,
  ADD_USER_SECTION_ERROR,
  GET_USER_TASK,
  GET_USER_TASK_SUCCESS,
  GET_USER_TASK_ERROR,
  MODIFY_TASK,
  MODIFY_TASK_SUCCESS,
  MODIFY_TASK_ERROR,
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
  modifyStoryboard: {
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
  templateList: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  userStoryboards: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  getOneSection: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  addTask: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  userContacts: {
    result: {
      data: {},
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  userSections: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  userTask: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  },
  modifyTask: {
    result: {
      data: [],
    },
    refreshing: false,
    error: null,
    isUpdate: false,
  }
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

    case MODIFY_STORYBOARD:
      return handleRequestReducer(state, action, 'modifyStoryboard')

    case MODIFY_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'modifyStoryboard')

    case MODIFY_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'modifyStoryboard')

    case GET_STORYBOARD_DETAIL:
      return handleRequestReducer(state, action, 'storyboardDetails')

    case GET_STORYBOARD_DETAIL_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'storyboardDetails')

    case GET_STORYBOARD_DETAIL_ERROR:
      return handleRequestErrorReducer(state, action, 'storyboardDetails')

    case GET_ONE_SECTION:
      return handleRequestReducer(state, action, 'getOneSection')

    case GET_ONE_SECTION_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'getOneSection')

    case GET_ONE_SECTION_ERROR:
      return handleRequestErrorReducer(state, action, 'getOneSection')

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

    case GET_TEMPLATE_LIST:
      return handleRequestReducer(state, action, 'templateList')

    case GET_TEMPLATE_LIST_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'templateList')

    case GET_TEMPLATE_LIST_ERROR:
      return handleRequestErrorReducer(state, action, 'templateList')

    case GET_USER_STORYBOARD:
      return handleRequestReducer(state, action, 'userStoryboards')

    case GET_USER_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'userStoryboards')

    case GET_USER_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'userStoryboards')

    case ADD_USER_STORYBOARD:
      return handleRequestReducer(state, action, 'userStoryboards')

    case ADD_USER_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'userStoryboards')

    case ADD_USER_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'userStoryboards')

    case GET_ONE_STORYBOARD:
      return handleRequestReducer(state, action, 'modifyStoryboard')

    case GET_ONE_STORYBOARD_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'modifyStoryboard')

    case GET_ONE_STORYBOARD_ERROR:
      return handleRequestErrorReducer(state, action, 'modifyStoryboard')

    case ADD_TASK:
      return handleRequestReducer(state, action, 'addTask')

    case ADD_TASK_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'addTask')

    case ADD_TASK_ERROR:
      return handleRequestErrorReducer(state, action, 'addTask')

    case GET_USER_BY_CONTACT:
      return handleRequestReducer(state, action, 'userContacts')

    case GET_USER_BY_CONTACT_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'userContacts')

    case GET_USER_BY_CONTACT_ERROR:
      return handleRequestErrorReducer(state, action, 'userContacts')

    case ADD_STORYBOARD_BY_TEMPLATE:
      return handleRequestReducer(state, action, 'addStoryboard')

    case ADD_STORYBOARD_BY_TEMPLATE_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'addStoryboard')

    case ADD_STORYBOARD_BY_TEMPLATE_ERROR:
      return handleRequestErrorReducer(state, action, 'addStoryboard')

    case ADD_USER_SECTION:
      return handleRequestReducer(state, action, 'userSections')

    case ADD_USER_SECTION_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'userSections')

    case ADD_USER_SECTION_ERROR:
      return handleRequestErrorReducer(state, action, 'userSections')

    case GET_USER_TASK:
      return handleRequestReducer(state, action, 'userTask')

    case GET_USER_TASK_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'userTask')

    case GET_USER_TASK_ERROR:
      return handleRequestErrorReducer(state, action, 'userTask')
    
    case MODIFY_TASK:
      return handleRequestReducer(state, action, 'modifyTask')

    case MODIFY_TASK_SUCCESS:
      return handleRequestSuccessReducer(state, action, 'modifyTask')

    case MODIFY_TASK_ERROR:
      return handleRequestErrorReducer(state, action, 'modifyTask')

    default:
      return state
  }
}
