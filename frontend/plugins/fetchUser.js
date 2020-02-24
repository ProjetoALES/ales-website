const falseOrEmpty = obj =>
  !obj || (Object.entries(obj).length === 0 && obj.constructor === Object)

export default function({ app }) {
  // If logged in but no user, fetch the user
  if (app.$auth.loggedIn && falseOrEmpty(app.$auth.user)) {
    return app.$auth.fetchUser()
  }
}
