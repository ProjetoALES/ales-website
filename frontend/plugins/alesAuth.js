const alesSetup = ({ app }) => {
  Object.defineProperty(app.$auth, 'alesUser', {
    get() {
      return this.$state.alesUser
    }
  })
}
const alesLogin = ({ app }) => {
  if (!app.$auth.alesUser) {
    return app.$axios
      .get('/me/')
      .then(({ data }) => {
        app.$auth.$storage.setState('alesUser', data || false)
      })
      .catch(error => {
        if (error.response.status === 403) {
          app.$auth.$storage.setState('alesUser', false)
          return
        }
        app.$consola.error(error)
        app.$toast.error('Erro pegando dados ALES')
      })
  }
  return Promise.resolve()
}
const alesLogout = ({ app }) => {
  app.$auth.$storage.setState('alesUser', false)
}

export default function(ctx) {
  // Setup the 'ales' prop
  alesSetup(ctx)

  // Setup listeners
  ctx.app.$auth.$storage.watchState('loggedIn', loggedIn => {
    if (loggedIn) {
      return alesLogin(ctx)
    } else {
      return alesLogout(ctx)
    }
  })

  // Fetch user
  if (ctx.app.$auth.loggedIn) {
    return alesLogin(ctx)
  }
}
