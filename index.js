const process = require('process')

const browser_builder = require('./src/browser')
const pdf_maker_builder = require('./src/pdf-maker')
const pdf_maker_workstream_builder = require('./src/pdf-maker-workstream')
const templates_builder = require('./src/templates')
const worker_page_builder = require('./src/worker-page')
const worker_pages_builder = require('./src/worker-pages')
const server = require('./src/server')

const label_route_builder = require('./src/routes/label')
const template_route_builder = require('./src/routes/template')

const templates = templates_builder({
  cache: process.env.NODE_ENV === 'production'
})

const template_route = template_route_builder(templates)

const start = async () => {
  const browser = await browser_builder()
  const worker_pages = await worker_pages_builder(browser, 20, worker_page_builder)
  const pdf_maker_workstream = pdf_maker_workstream_builder(worker_pages)
  const pdf_maker = pdf_maker_builder(pdf_maker_workstream)

  const label_route = label_route_builder(templates, pdf_maker)

  await server.launch(template_route, label_route)
}

start().then(() => console.log('Server started'))
