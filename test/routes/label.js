const assert = require('assert')
const fs = require('fs')
const route_builder = require('../../src/routes/label')

const templates = async (name) => {
  if (name === '/notfound') {
    const error = new Error()
    error.not_found = true
    throw error
  }
  if (name === '/overloaded') {
    return 'overloaded'
  }
  return 'content'
}

const pdf_maker = async (content) => {
  if (content === 'overloaded') {
    const error = new Error()
    error.overloaded = true
    throw error
  }
  return `this_is_now_a_pdf(${content})`
}

const route = route_builder(templates, pdf_maker)

describe('the label route', function () {
  it('should return a pdf if the template exists', function () {
    const ctx = {
      path: '/label/found',
    }
    return route(ctx)
      .then(() => assert(ctx.body === 'this_is_now_a_pdf(content)'))
  })

  it('should 404 if the template does not exist', function () {
    const ctx = {
      path: '/label/notfound',
    }
    return route(ctx).then(() => assert(ctx.status === 404))
  })

  it('should do nothing if the path is wrong', function () {
    const ctx = {
      path: 'notlabel',
    }
    return route(ctx).then(() => assert(!ctx.body))
  })

  it('should 503 if the pdf_maker is overloaded', function() {
    const ctx = {
      path: '/label/overloaded',
    }
    return route(ctx).then(() => assert(ctx.status === 503))
  })
})
