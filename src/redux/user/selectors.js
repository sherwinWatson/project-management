export const selectToken = (state) => state.user.login.result.data.token
export const selectUser = (state) => state.user.me.result.data
export const selectLoginRefreshing = (state) => state.user.login.refreshing || state.user.me.refreshing
export const selectLoginError = (state) => state.user.login.error
export const selectMeError = (state) => state.user.me.error
