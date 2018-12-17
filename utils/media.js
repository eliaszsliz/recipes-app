module.exports = {
  media_prefix: function(url) {
    if (url.indexOf('static') >= 0) {
      return url
    }
    return 'http://localhost:8000' + url
  }
}
