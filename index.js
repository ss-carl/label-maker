const route_tempate = require('./src/routes/template')
const server = require('./src/server')

server.launch(route_tempate)
  .then(() => console.log('Server starting'))
  .catch((err) => console.log(`Server startup failed: ${err}`))
