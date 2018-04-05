const koa = require('koa')

const app = new koa()

const launch = async (route_template) => {
  app.listen(3000)
  app.use(route_template)
}

module.exports = {
  launch
}
