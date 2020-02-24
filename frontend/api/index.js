import Koa from 'koa'
import logger from 'koa-logger'
import consola from 'consola'
import jwt from 'koa-jwt'
import jwtrsa from 'jwks-rsa'
import schools from './routes/schoolSearch'

// Create koa instnace
const app = new Koa()

// Middlewares
app.use(
  logger({
    transporter: (str, args) => {
      consola.log(str)
    }
  })
)
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER

// Auth
const whitelist = []
app.use(
  jwt({
    secret: jwtrsa.koaJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 2,
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: AUTH0_API_IDENTIFIER,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  }).unless({ path: whitelist })
)

// // Import routes
app.use(schools.routes())
app.use(schools.allowedMethods())

consola.success('Registered /api')

// Export the server middleware
export default {
  path: '/api',
  handler: app.callback()
}
