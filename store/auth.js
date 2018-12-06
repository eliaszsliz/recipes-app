// const _ = {
//   state: {
//     id: null,
//     username: 'test',
//     token: null
//   },
//   mutations: {
//     setUser: (state, payload) => {
//       state.username = payload.username
//       state._id = payload.id
//     },
//     setToken: (state, payload) => {
//       state.authToken = payload
//     }
//   },
//   actions: {
//     logIn: async ({ commit }, payload) => {
//       const { data: user, headers } = await server.post('/users/login', payload)
//       commit('setUser', user)
//       commit('setAuthToken', headers.authorization)
//     },
//     signUp: async ({ commit }, payload) => {
//       const { data: user, headers } = await server.post(
//         '/users/signup',
//         payload
//       )
//       commit('setUser', user)
//       commit('setAuthToken', headers.authorization)
//     }
//   },
//   getters: {
//     username: state => state.username,
//     uid: state => state._id,
//     authenticated: state => !!state.authToken,
//     authToken: state => state.authToken
//   }
// }

export const state = () => ({
  id: null,
  username: 'test',
  token: null
})

export const actions = {
  login: async ({ commit }, { username, password }) => {
    const { data: user, headers } = await server.post('/users/login', payload)
    this.$apolloHelpers.onLogin(token)
    console.log('akcja')
    commit('setUser', user)
    commit('setToken', headers.authorization)
  },
  logout: async ({ commit }) => {
    commit('clearUser')
  }
}

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
  isAuthenticated: state => !!(state.id && state.token && state.username)
}
