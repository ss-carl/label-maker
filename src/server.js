const koa = require('koa')

const app = new koa()

const launch = async (template_route, label_route) => {
  app.listen(3000)
  app.use(template_route)
  app.use(label_route)
}

module.exports = {
  launch
}
