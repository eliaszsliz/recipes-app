import Vue from 'vue'

export const state = () => ({
  id: null,
  username: '',
  token: '',
  avatar: '',
  favouredIds: []
})

export const actions = {
  fetchUser({ commit }) {}
}

export const mutations = {
  setUser(state, { id, username, favouredIds }) {
    state.username = username
    state.id = ++id
    state.favouredIds = Vue.set(state, 'favouredIds', favouredIds.map(i => +i))
  },
  setToken(state, token) {
    state.token = token
  },
  addFavourite(state, id) {
    state.favouredIds.push(+id)
  },
  removeFavourite(state, id) {
    state.favouredIds.splice(state.favouredIds.indexOf(id), 1)
  },
  clearUser(state) {
    state.username = null
    state.id = null
    state.favouredIds = Vue.set(state, 'favouredIds', [])
    state.token = null
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authenticatedUser: state => ({
    id: state.id,
    username: state.username,
    avatar: state.avatar,
    favouredIds: state.favouredIds,
    token: state.token
  }),
  favouredIds: state => state.favouredIds
}
