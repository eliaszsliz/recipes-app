export default function({ app, error }) {
  // todo search token in store and localstorage too
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({ errorCode: 403, message: 'You are not allowed to see this' })
  }
}
