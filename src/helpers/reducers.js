
export const handleRequestReducer = (state, action, name) => {
  let loading = 1
  if (state[name]) {
    loading = !state[name].loading
      ? 1
      : ++state[name].loading
  }
  return {
    ...state,
    [name]: {
      ...state[name],
      refreshing: true,
      loading: loading,
      page: action.payload && action.payload.params && action.payload.params.page ? action.payload.params.page : 1,
    },
  }
}

export const handleRequestErrorReducer = (state, action, name) => {
  let err = action.error
  err.createdAt = new Date()
  const loading = !state[name].loading || state[name].loading <= 0
    ? 0
    : --state[name].loading
  return {
    ...state,
    [name]: {
      ...state[name],
      refreshing: false,
      loading: loading,
      error: err,
    },
  }
}

export const handleRequestSuccessReducer = (state, action, name, limit, append = false, isEarlier = false, infiniteLoad = false) => {
  let newResult
  const loading = !state[name].loading || state[name].loading <= 0
    ? 0
    : --state[name].loading
  if (append && infiniteLoad) {
    if (isEarlier) {
      newResult = {
        ...state[name].result,
        data: [
          ...action.payload.data,
          ...state[name].result.data,
        ],
      }
    } else {
      newResult = {
        ...state[name].result,
        data: [
          ...state[name].result.data,
          ...action.payload.data,
        ],
      }
    }
  } else {
    newResult = action.payload
  }

  return {
    ...state,
    [name]: {
      ...state[name],
      loading: loading,
      result: newResult,
      refreshing: false,
      error: null,
      hasNextPage: limit ? action.payload.data.length >= limit : false,
    },
  }
}
