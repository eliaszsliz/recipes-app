export default function({ store, redirect, route }) {
  if (!store.getters['auth/isAuthenticated']) {
    return redirect({
      name: 'login',
      query: {
        next: route.path
      }
    })
  }
}
