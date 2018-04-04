const ejs = require('ejs')

const options = {
  cache: true,
  filename: 'cache',
  compileDebug: true,
  debug: true,
}

ejs.renderFile('templates/sample.ejs', {}, options)
  .then(f)
  .catch(f)

function f() { console.log(arguments) }
