let cookies

const TOAST_KEY = 'serverToasts'

const decode = encoded => {
  return encoded
}
const encode = raw => {
  return raw
}

const getToasts = () => {
  const encoded = cookies.get(TOAST_KEY)
  if (encoded) {
    return decode(encoded)
  }
  return []
}

const setToasts = toasts => {
  const encoded = encode(toasts)
  cookies.set(TOAST_KEY, encoded)
}

const buildToastDef = (type, message, options) => {
  return {
    type,
    message,
    options
  }
}

const enqueueToast = (type, message, options) => {
  const toasts = getToasts()
  toasts.push(buildToastDef(type, message, options))
  setToasts(toasts)
}

const processClient = $toast => {
  const toasts = getToasts()
  toasts.forEach(({ type, message, options }) => {
    $toast[type](message, options)
  })
  cookies.remove(TOAST_KEY)
}

const toast = (message, options = {}) => enqueueToast('show', message, options)
toast.info = (message, options = {}) => enqueueToast('info', message, options)
toast.success = (message, options = {}) =>
  enqueueToast('success', message, options)
toast.error = (message, options = {}) => enqueueToast('error', message, options)
toast.clear = () => enqueueToast('clear')

export default function(ctx, inject) {
  cookies = ctx.app.$cookies
  if (process.server) {
    // Inject the server version of toast
    inject('toast', toast)
  } else {
    processClient(ctx.app.$toast)
  }
}
