export function media_prefix(url) {
  if (process.env.NODE_ENV === 'production') {
    return url
  } else {
    if (url.indexOf('static') >= 0) {
      return url
    }
    return 'http://127.0.0.1:8000' + url
  }
}
