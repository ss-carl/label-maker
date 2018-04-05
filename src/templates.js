const ejs = require('ejs')

const defaults = {
  cache: true,
  filename: 'cache',
  compileDebug: false,
  debug: false,
}

const templates_builder = (options) => {
  options = Object.assign({}, defaults, options || {})

  return async (name) => {
    if (!name || name.length <= 1) {
      const error = new Error('Template name is too short')
      error.not_found = true
      throw error
    }

    try {
      return await ejs.renderFile(`templates${name}`, {}, options)
    } catch (e) {
      if (e.code === 'ENOENT') {
        e.not_found = true
      }
      throw e
    }
  }
}

module.exports = templates_builder
