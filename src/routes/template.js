const route = (templates) => async (ctx) => {
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
  }
}

module.exports = route
