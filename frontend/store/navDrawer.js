export const state = () => ({
  active: false
})

export const mutations = {
  set(state, newVal) {
    state.active = newVal
  },
  toggle(state) {
    state.active = !state.active
  }
}
