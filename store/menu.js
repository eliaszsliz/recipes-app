export const state = () => ({
  isOpen: false
})

export const actions = {}

export const mutations = {
  openMenu(state) {
    state.isOpen = true
  },
  closeMenu(state) {
    state.isOpen = false
  },
  toggleMenu(state) {
    state.isOpen = !state.isOpen
  }
}

export const getters = {
  isOpen: state => state.isOpen
}
