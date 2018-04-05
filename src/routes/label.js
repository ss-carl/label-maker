const route_builder = (templates, pdf_maker) => async (ctx, next) => {
  if (ctx.path.startsWith('/label')) {
    const label = ctx.path.substring('/label'.length)
    try {
      const template = await templates(label)
      ctx.body = await pdf_maker(template)
    } catch (e) {
      if (e.not_found) {
        ctx.status = 404
      } else {
        throw e
      }
    }
  } else if (next) {
    await next()
  }
}

module.exports = route_builder
