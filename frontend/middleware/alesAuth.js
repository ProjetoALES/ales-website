export const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        component => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(
          ctor => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}

export const getMatchedComponents = (route, matches = false) => {
  return [].concat.apply(
    [],
    route.matched.map(function(m, index) {
      return Object.keys(m.components).map(function(key) {
        matches && matches.push(index)
        return m.components[key]
      })
    })
  )
}

export function normalizePath(path = '') {
  // Remove query string
  let result = path.split('?')[0]

  // Remove redundant / from the end of path
  if (result.charAt(result.length - 1) === '/') {
    result = result.slice(0, -1)
  }

  return result
}

export default function(ctx) {
  // Disable middleware if options: { auth: false } is set on the route
  if (routeOption(ctx.route, 'alesAuth', false)) {
    return
  }

  // Disable middleware if no route was matched to allow 404/error page
  const matches = []
  const Components = getMatchedComponents(ctx.route, matches)
  if (!Components.length) {
    return
  }

  const { login, callback } = ctx.$auth.options.redirect
  const pageIsInGuestMode = routeOption(ctx.route, 'alesAuth', 'guest')
  const insidePage = page =>
    normalizePath(ctx.route.path) === normalizePath(page)

  if (ctx.$auth.alesUser) {
    // -- Registered --
    if (!login || insidePage(login) || pageIsInGuestMode) {
      ctx.$auth.redirect('home')
    }
  } else if (!pageIsInGuestMode && (!callback || !insidePage(callback))) {
    // -- Guest --
    // (Those passing `callback` at runtime need to mark their callback component
    // with `auth: false` to avoid an unnecessary redirect from callback to login)
    if (ctx.$auth.loggedIn) {
      ctx.$auth.redirect('home')
    } else {
      ctx.$auth.redirect('login')
    }
  }
}
