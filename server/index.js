const express = require('express')
// const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

app.set('port', { port: PORT })

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(PORT, HOST)
  // consola.ready({
  //   message: `Server listening on http://${HOST}:${PORT}`,
  //   badge: true
  // })
}
start()
