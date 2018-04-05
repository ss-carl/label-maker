const route = (templates) => async (ctx, next) => {
  if (ctx.path.startsWith('/template')) {
    const template_name = ctx.path.substring('/template'.length)
    try {
      const template = await templates(template_name)
      ctx.body = template
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

module.exports = route
