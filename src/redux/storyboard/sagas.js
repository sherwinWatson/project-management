import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import moment from 'moment'

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
  MODIFY_TASK_SUCCESS,
  MODIFY_TASK_ERROR,
  MODIFY_TASK,
} from './actions'

export function* getStoryboard() {
  try {
    const response = yield axios({
      url: 'storyboards',
      method: 'get',
    })
    yield put({ type: GET_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_STORYBOARD_ERROR, error })
  }
}

export function* addStoryboard(action) {
  try {
    const { name, description, startDate, finishDate, portion } = action.payload

    const response = yield axios({
      url: 'storyboards',
      method: 'post',
      data: {
        name: name,
        description: description,
        start_date: startDate.format('YYYY-MM-DD'),
        finish_date: finishDate.format('YYYY-MM-DD'),
        portion,
      },
    })
    yield put({ type: ADD_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_STORYBOARD_ERROR, error })
  }
}

export function* modifyStoryboard(action) {
  try {
    const { id, name, description, startDate, finishDate } = action.payload

    const response = yield axios({
      url: 'storyboards/' + id,
      method: 'post',
      data: {
        name: name,
        description: description,
        start_date: startDate.format('YYYY-MM-DD'),
        finish_date: finishDate.format('YYYY-MM-DD'),
      }
    })
    yield put({ type: MODIFY_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: MODIFY_STORYBOARD_ERROR, error })
  }
}

export function* getOneStoryboard(action) {
  try{
    const { storyboardId } = action.payload

    const response = yield axios({
      url: '/storyboards/' + storyboardId,  // 7
      method: 'get'
    })

    yield put({ type: GET_ONE_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_ONE_STORYBOARD_ERROR, error})
  }
}

export function* getStoryboardDetails(action) {
  try {
    const { storyboardId } = action.payload

    const response = yield axios({
      url: '/sections/storyboards/' + storyboardId + '?include=users',
      method: 'get',
    })

    yield put({ type: GET_STORYBOARD_DETAIL_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_STORYBOARD_DETAIL_ERROR, error })
  }
}

export function* getOneSection(action) {
  try {
    const { sectionId } = action.payload

    const response = yield axios({
      url: '/sections/' + sectionId + '?include=tasks,users', // 29
      method: 'get',
    })

    yield put({ type: GET_ONE_SECTION_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_ONE_SECTION_ERROR, error })
  }
}

export function* addStoryboardDetails(action) {
  try {
    const { storyboardId, subject, details, targetDate } = action.payload

    const response = yield axios({
      url: 'sections',
      method: 'post',
      data: {
        storyboard_id: storyboardId,
        subject,
        details,
        target_date: targetDate.format('YYYY-MM-DD'),
        is_done: 0,
      },
    })
    yield put({ type: ADD_STORYBOARD_DETAIL_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_STORYBOARD_DETAIL_ERROR, error })
  }
}

export function* modifyStoryboardDetails(action) {
  try {
    const { sectionId, subject, details, targetDate } = action.payload

    const response = yield axios({
      url: 'sections/' + sectionId,
      method: 'post',
      data: {
        subject,
        details,
        targetDate,
        type: 'modify',
      },
    })
    yield put({ type: MODIFY_STORYBOARD_DETAIL_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: MODIFY_STORYBOARD_DETAIL_ERROR, error })
  }
}

export function* removeStoryboardDetails(action) {
  try {
    const { storyboardId } = action.payload

    const response = yield axios({
      url: 'storyboard-detail',
      method: 'post',
      data: {
        storyboard_id: storyboardId,
        type: 'remove',
      },
    })
    yield put({ type: REMOVE_STORYBOARD_DETAIL_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: REMOVE_STORYBOARD_DETAIL_ERROR, error })
  }
}

export function* getTemplateList(action) {
  try {
    const response = yield axios({
      url: 'templates',
      method: 'get',
    })

    yield put({ type: GET_TEMPLATE_LIST_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_TEMPLATE_LIST_ERROR, error })
  }
}

export function* getUserStoryboard(action) {
  try {
    const { storyboardId } = action.payload
    const response = yield axios({
      url: 'storyboardusers/storyboards/'+ storyboardId,  // 19
      method: 'get',
    })
    yield put({ type: GET_USER_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_USER_STORYBOARD_ERROR, error })
  }
}

export function* addUserStoryboard(action) {
  try {
    const { storyboardId, member } = action.payload
    const response = yield axios({
      url: 'storyboardusers/storyboards/'+ storyboardId, // 17
      method: 'post',
      data: {
        member: member
      },
    })
    yield put({ type: ADD_USER_STORYBOARD_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_USER_STORYBOARD_ERROR, error })
  }
}

export function* addTask(action) {
  try {
    const { sectionId, name, startDate, finishDate, status, member } = action.payload

    const response = yield axios({
      url: 'tasks',  // 32
      method: 'POST',
      data: {
        section_id: sectionId,
        name: name,
        start_date: startDate.format('YYYY-MM-DD'),
        finish_date: finishDate.format('YYYY-MM-DD'),
        status: status,
        member: member
      }
    })
    yield put({ type: ADD_TASK_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_TASK_ERROR, error })
  }
}

export function* getUserByContacts(action) {
  try {
    const { phonenumbers } = action.payload

    const response = yield axios ({
      url: 'users/contacts', //11
      method: 'POST',
      data: {
        phonenumbers: phonenumbers
      }
    })
    yield put({ type: GET_USER_BY_CONTACT_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_USER_BY_CONTACT_ERROR})
  }
}

export function* addStoryboardByTemplate(action) {
  try {
    const { name, description, startDate, finishDate, section, member } = action.payload

    const response = yield axios({
      url: 'storyboards/template',
      method: 'post',
      data: {
        name: name,
        description: description,
        start_date: startDate.format('YYYY-MM-DD'),
        finish_date: finishDate.format('YYYY-MM-DD'),
        section: section,
        member: member,
      },
    })
    yield put({ type: ADD_STORYBOARD_BY_TEMPLATE_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_STORYBOARD_BY_TEMPLATE_ERROR, error })
  }
}

export function* addUserSection(action) {
  try {
    const { sectionId, member } = action.payload
    const response = yield axios({
      url: 'sectionusers/sections/' + sectionId,
      method: 'post',
      data: {
        member: member,
      },
    })
    yield put({ type: ADD_USER_SECTION_SUCCESS, payload: response.data, id: sectionId })
  } catch (error) {
    yield put({ type: ADD_USER_SECTION_ERROR, error })
  }
}

export function* getUserTask(action) {
  try{ 
    const { taskId } = action.payload
    const response = yield axios({
      url: 'taskusers/tasks/' + taskId,
      method: 'get',
    })
    yield put({ type: GET_USER_TASK_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: GET_USER_TASK_ERROR, error})
  }
}

export function* modifyTask(action) {
  try {
    const { taskId, name, startDate, finishDate, status, member } = action.payload

    const response = yield axios({
      url: 'tasks/' + taskId,  // 32
      method: 'POST',
      data: {
        name: name,
        start_date: startDate.format('YYYY-MM-DD'),
        finish_date: finishDate.format('YYYY-MM-DD'),
        status: status,
        member: member
      }
    })
    yield put({ type: MODIFY_TASK_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: MODIFY_TASK_ERROR, error })
  }
}

export function* watchStoryboard() {
  yield takeEvery(GET_STORYBOARD, getStoryboard)
  yield takeEvery(ADD_STORYBOARD, addStoryboard)
  yield takeEvery(MODIFY_STORYBOARD, modifyStoryboard)
  yield takeEvery(GET_ONE_STORYBOARD, getOneStoryboard)
  yield takeEvery(GET_STORYBOARD_DETAIL, getStoryboardDetails)
  yield takeEvery(GET_ONE_SECTION, getOneSection)
  yield takeEvery(ADD_STORYBOARD_DETAIL, addStoryboardDetails)
  yield takeEvery(MODIFY_STORYBOARD_DETAIL, modifyStoryboardDetails)
  yield takeEvery(REMOVE_STORYBOARD_DETAIL, removeStoryboardDetails)
  yield takeEvery(ADD_STORYBOARD_SUCCESS, getStoryboard)
  yield takeEvery(GET_TEMPLATE_LIST, getTemplateList)
  yield takeEvery(GET_USER_STORYBOARD, getUserStoryboard)
  yield takeEvery(ADD_USER_STORYBOARD, addUserStoryboard)
  yield takeEvery(ADD_TASK, addTask)
  yield takeEvery(GET_USER_BY_CONTACT, getUserByContacts)
  yield takeEvery(ADD_STORYBOARD_BY_TEMPLATE, addStoryboardByTemplate)
  yield takeEvery(ADD_USER_SECTION, addUserSection)
  yield takeEvery(GET_USER_TASK, getUserTask)
  yield takeEvery(MODIFY_TASK, modifyTask)
}
