const assert = require('assert')
const route_builder = require('../../src/routes/template')

const templates = async (template_name) => {
  if (template_name !== '/exists.ejs') {
    const error = new Error('template not found')
    error.not_found = true
    throw error
  }
  return 'stub template'
}

const route = route_builder(templates)

describe('the template route', function () {
  it('should do nothing if the path is wrong', function () {
    const ctx = {
      path: '/nottemplates',
    }
    return route(ctx).then(() => assert(!ctx.body))
  })

  it('should 404 if the template doesnt exist', function() {
    const ctx = {
      path: '/template/doesnotexist.ejs'
    }
    return route(ctx).then(() => assert(ctx.status === 404))
  })

  it('should render the template if it exists', function() {
    const ctx = {
      path: '/template/exists.ejs'
    }
    return route(ctx).then(() => assert(ctx.body))
  })
})
