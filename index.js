const process = require('process')
const template_route_builder = require('./src/routes/template')
const templates_builder = require('./src/templates')
const server = require('./src/server')

const templates = templates_builder({
  cache: process.env.NODE_ENV === 'production'
})

const template_route = template_route_builder(templates)

server.launch(template_route)
  .then(() => console.log('Server starting'))
  .catch((err) => console.log(`Server startup failed: ${err}`))
