const template_route_builder = require('./src/routes/template')
const server = require('./src/server')

const template_route = template_route_builder(async (name) => {
  if (name === '/notfound') {
    const error = new Error()
    error.not_found = true
    throw error
  }
  return 'butts'
})

server.launch(template_route)
  .then(() => console.log('Server starting'))
  .catch((err) => console.log(`Server startup failed: ${err}`))
