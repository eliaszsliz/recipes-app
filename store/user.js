export const state = () => ({
  counter: 0
})

export const mutations = {
  add(state, value = 1) {
    state.counter += value
  }
}
