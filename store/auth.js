export const state = () => ({
  id: null,
  username: 'test',
  token: null,
  avatar: ''
})

export const actions = {}

export const mutations = {
  setUser(state, { id, username }) {
    console.log('set user')

    state.username = username
    state.id = id
  },
  setToken(state, token) {
    state.token = token
  },
  clearUser(state) {
    state.username = null
    state.id = null
  }
}

export const getters = {
  isAuthenticated: state => !!(state.id && state.token && state.username),
  authenticatedUser: state => ({
    id: state.id,
    username: state.username,
    avatar: state.avatar
  })
}
