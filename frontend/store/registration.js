import debounce from 'lodash/debounce'

const student = 'student'
const volunteer = 'volunteer'
const unset = 'none'

function updateAuth0UserMetadata(update, setUpdateTime, onError) {
  const data = {
    user_metadata: update
  }
  const auth0Domain = process.env.AUTH0_DOMAIN
  const url = `https://${auth0Domain}/api/v2/users/${this.$auth.user.user_id}`
  return this.$auth
    .request({
      method: 'patch',
      url,
      data
    })
    .then(user => this.$auth.setUser(user))
    .then(() => {
      if (setUpdateTime) {
        setUpdateTime(this.$moment())
      }
    })
    .catch(error => {
      if (onError) {
        onError(error)
      } else {
        return Promise.reject(error)
      }
    })
}

const deboucedUpdateFormAuth0Metadata = debounce(
  function(dispatch, setUpdateTime) {
    return dispatch('updateFormAuth0Metadata', setUpdateTime)
  },
  1000 * 5,
  { maxWait: 1000 * 15 }
)

export const state = () => ({
  wantsToBe: unset,
  formData: {}
})

export const mutations = {
  setWantsToBe(state, newVal) {
    state.wantsToBe = newVal
  },
  updateForm(state, override) {
    state.formData = { ...state.formData, ...override }
  },
  setForm(state, form) {
    state.formData = form
  }
}

export const actions = {
  /**
   * Auth0 Actions
   */
  updateWantsToBeAuth0Metadata({ state }) {
    const wantsToBe = state.wantsToBe
    return updateAuth0UserMetadata.call(this, { wantsToBe })
  },
  updateFormAuth0Metadata({ state }, setUpdateTime) {
    const registrationForm = state.formData
    const saveFail = () => {
      if (this.$nuxt.isOnline) {
        this.$toast.error('Não foi possível salvar o formulário')
      }
    }
    return updateAuth0UserMetadata.call(
      this,
      { registrationForm },
      setUpdateTime,
      saveFail
    )
  },
  setWantsToBeFromAuth0({ commit }) {
    if (
      this.$auth.user &&
      this.$auth.user.user_metadata &&
      this.$auth.user.user_metadata.wantsToBe
    ) {
      setTimeout(() =>
        commit('setWantsToBe', this.$auth.user.user_metadata.wantsToBe)
      )
    }
  },

  /**
   * Reset and form Actions
   */
  reset({ commit }) {
    commit('setForm', {})
    commit('setWantsToBe', unset)
  },
  updateFormData({ commit, dispatch }, { formData, setUpdateTime }) {
    commit('updateForm', formData)
    return deboucedUpdateFormAuth0Metadata(dispatch, setUpdateTime)
  },
  setVolunteer({ commit }) {
    commit('setWantsToBe', volunteer)
    if (this.$auth.loggedIn) {
      return updateAuth0UserMetadata.call(this, { wantsToBe: volunteer })
    }
  },
  setStudent({ commit }) {
    commit('setWantsToBe', student)
    if (this.$auth.loggedIn) {
      return updateAuth0UserMetadata.call(this, { wantsToBe: student })
    }
  }
}

export const getters = {
  wantsToBeVolunteer(state) {
    return state.wantsToBe === volunteer
  },
  wantsToBeStudent(state) {
    return state.wantsToBe === student
  }
}
