const stripBearer = token =>
  token.startsWith('Bearer') ? token.replace('Bearer ', '') : token

const linkAccountHandler = ({ app }) => provider => {
  const primary = {
    primaryId: app.$auth.user.user_id,
    primaryToken: app.$auth.getToken('auth0')
  }
  app.$auth.$storage.setUniversal('linking', true)
  app.$auth.$storage.setUniversal('primaryAuth0Account', primary)
  return app.$auth.loginWith('auth0', {
    params: {
      connection: provider
    }
  })
}
const hasAccount = ({ app }) => provider => {
  if (!app.$auth.loggedIn) {
    return false
  }
  return (
    app.$auth.user.identities.findIndex(id => id.provider === provider) >= 0
  )
}
const unlinkAccount = ({ app }) => provider => {
  const auth0Domain = process.env.AUTH0_DOMAIN
  const primary = app.$auth.user.user_id
  const secondary = app.$auth.user.identities.find(
    id => id.provider === provider
  ).user_id

  return app.$auth
    .request({
      method: 'delete',
      url: `https://${auth0Domain}/api/v2/users/${primary}/identities/${provider}/${secondary}`
    })
    .then(() => app.$auth.fetchUser())
    .catch(error => {
      app.$consola.error(error)
      app.$toast.error('Erro desvinculando conta')
    })
}
const accountLinkingSetup = ctx => {
  const { app } = ctx
  app.$auth.$storage.syncUniversal('linking', false)
  app.$auth.$storage.syncUniversal('primaryAuth0Account', null)
  app.$auth.linkAccount = linkAccountHandler(ctx)
  app.$auth.hasAccount = hasAccount(ctx)
  app.$auth.unlinkAccount = unlinkAccount(ctx)
}
const cancelAccountLinking = ({ app }) => {
  app.$auth.$storage.setUniversal('linking', false)
  app.$auth.$storage.setUniversal('primaryAuth0Account', null)
}
const linkAccounts = ctx => {
  const { app } = ctx
  const { primaryId, primaryToken } = app.$auth.$storage.getUniversal(
    'primaryAuth0Account'
  )
  const secondaryToken = stripBearer(app.$auth.getRefreshToken('auth0'))
  const auth0Domain = process.env.AUTH0_DOMAIN
  const url = `https://${auth0Domain}/api/v2/users/${encodeURIComponent(
    primaryId
  )}/identities`

  return app.$auth
    .request({
      method: 'post',
      url,
      data: {
        link_with: secondaryToken
      },
      headers: {
        Authorization: primaryToken
      }
    })
    .then(data => app.$auth.setToken('auth0', primaryToken))
    .then(() => app.$auth.fetchUser())
    .catch(error => {
      app.$consola.error(error)
      app.$toast.error('Erro vinculando conta')
    })
    .then(() => {
      cancelAccountLinking(ctx)
    })
}

export default function(ctx) {
  const { app } = ctx
  accountLinkingSetup(ctx)

  app.$auth.$storage.watchState('loggedIn', loggedIn => {
    if (!loggedIn) {
      cancelAccountLinking(ctx)
    }
  })
  if (
    app.$auth.$storage.getUniversal('linking') &&
    app.$auth.user.user_id !==
      app.$auth.$storage.getUniversal('primaryAuth0Account').primaryId
  ) {
    return linkAccounts(ctx)
  }
}
