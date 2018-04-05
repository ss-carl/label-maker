const process = require('process')
const label_route_builder = require('./src/routes/label')
const template_route_builder = require('./src/routes/template')
const templates_builder = require('./src/templates')
const server = require('./src/server')

const templates = templates_builder({
  cache: process.env.NODE_ENV === 'production'
})

const template_route = template_route_builder(templates)

const pdf_maker = async (content) => 'magic pdf maker'

const label_route = label_route_builder(templates, pdf_maker)

server.launch(template_route, label_route)
  .then(() => console.log('Server starting'))
