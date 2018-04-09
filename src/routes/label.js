const read_stream = require('../read-stream')

const route_builder = (templates, pdf_maker) => async (ctx, next) => {
  if (ctx.path.startsWith('/label')) {
    const label = ctx.path.substring('/label'.length)

    try {
      const buffer = await read_stream(ctx.req)
      const options = buffer.length ? JSON.parse(buffer.toString()) : undefined
      const template = await templates(label, options && options.template)
      ctx.body = await pdf_maker(template, options && options.pdf)
      ctx.type = 'application/pdf'
    } catch (e) {
      if (e.not_found) {
        ctx.status = 404
      } else if (e.overloaded) {
        ctx.status = 503
      } else {
        throw e
      }
    }
  } else if (next) {
    await next()
  }
}

module.exports = route_builder
