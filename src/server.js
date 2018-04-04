const koa = require('koa')

const app = new koa()

const launch = async () => {
  app.listen(3000)
  app.on('error', f)
}

function f() { console.log(arguments) }

launch()
  .then(f)
  .catch(f)
