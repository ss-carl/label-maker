const koa = require('koa')

const app = new koa()

const launch = async (template_route) => {
  app.listen(3000)
  app.use(template_route)
}

module.exports = {
  launch
}
