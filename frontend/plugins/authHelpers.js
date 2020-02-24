import decodeJwt from 'jwt-decode'

const stripBearer = token =>
  token.startsWith('Bearer') ? token.replace('Bearer ', '') : token

const fetchUser = ctx => () => {
  const { app, redirect } = ctx
  const { sub } = decodeJwt(stripBearer(app.$auth.getToken('auth0')))
  const auth0Domain = process.env.AUTH0_DOMAIN
  const options = {
    method: 'GET',
    url: `https://${auth0Domain}/api/v2/users/${sub}`,
    headers: {
      Authorization: app.$auth.getToken('auth0')
    }
  }
  return app.$auth
    .request(options)
    .then(user => app.$auth.setUser(user))
    .catch(error => {
      app.$consola.error(error)
      app.$auth.logout()
      app.$toast.error('Erro de autenticação')
      redirect('/')
    })
}

export default function(ctx) {
  ctx.app.$auth.fetchUser = fetchUser(ctx)
}
